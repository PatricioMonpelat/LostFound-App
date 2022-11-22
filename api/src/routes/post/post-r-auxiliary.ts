import { Post, Subscription } from "../../mongoDB";
import { DateTime } from "luxon";
import { IPost } from "../../mongoDB/models/Post";
import { ISubscription } from "../../mongoDB/models/Subscription";
import { LeanDocument } from "mongoose";

export async function searchPostsByQuery(
  queryFromReq: any
): Promise<
  import("mongoose").LeanDocument<
    { [x: string]: any } & Required<{ _id: unknown }>
  >[]
> {
  try {
    const { name, number, country, date_lost } = queryFromReq;
    // parseo el número del documento para sacarle los símbolos:
    let numberOnDocParsed;
    if (typeof number === "string") {
      numberOnDocParsed = number.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    }

    // date_lost tiene que ser menor o igual que date_found para que matchee.
    // La parseo con DateTime para chequear si es una fecha válida y que salte un error si no lo es:
    let parsedToDateCorrectly;
    if (typeof date_lost === "string") {
      let dateLostParsed: any = DateTime.fromFormat(date_lost, "yyyy-MM-dd");
      if (dateLostParsed.invalid) {
        throw new Error(dateLostParsed.invalid?.explanation);
      }
      parsedToDateCorrectly = dateLostParsed.toJSDate();
    } else {
      throw new Error(
        `The date found must be a valid date string yyyy-MM-dd. Example: 2022-10-23`
      );
    }
    // mongoose automáticamente compara la fecha yyyy-MM-dd correctamente contra la ISO de la DB. Pero igualmente intento parsearla con Luxon para que chequee si es una fecha válida o no. Si no lo es, tirará error. Si lo es, aprovecho y la uso para la query, pero es lo mismo que usar la date yyyy-MM-dd que viene por query.
    // El name se compara automáticamente con un "iLike". No hace falta pasarla a minúscula.
    const postsFound = await Post.find(
      {
        $and: [
          {
            $or: [{ name_on_doc: name }, { number_on_doc: numberOnDocParsed }],
          },
          { country_found: country },
          { date_found: { $gte: parsedToDateCorrectly } },
        ],
      },
      {
        _id: 1,
        "user_posting.posts": 0,
        "user_posting.createdAt": 0,
        "user_posting.updatedAt": 0,
      }
    ).lean();
    return postsFound;
  } catch (error: any) {
    console.log(`Error en fn aux search Posts By Query`);
    throw new Error(error.message);
  }
}

export async function findMatchingSuscriptions(newPost: IPost) {
  try {
    const { name_on_doc, number_on_doc, country_found, date_found } = newPost;

    // parseos y validaciones:
    // numberOnDoc, le saco los símbolos:
    let numberOnDocParsed;
    if (typeof number_on_doc === "string") {
      numberOnDocParsed = number_on_doc
        .replace(/[^A-Za-z0-9]/g, "")
        .toLowerCase();
    }
    // date_found: No necesito parsearla porque ya vino parseada por haber sido recién creada.

    const findMatchingSubscriptions = await Subscription.find(
      {
        name_on_doc: name_on_doc,
        number_on_doc: numberOnDocParsed,
        country_lost: country_found,
        date_lost: { $lte: date_found },
      },
      {
        _id: 1,
        "user_subscribed._id": 1,
        "user_subscribed.name": 1,
        "user_subscribed.email": 1,
      }
    ).lean();
    // Agregar en el email un link al detalle del post nuevo que coincide con su subscription. Para eso voy a necesitar el _id del nuevo post, y meterlo en el params de la url de nuestra página para que vea el detalle de la publicación. Por ejemplo :
    // www.lostfound.app/found/${_id}
    // let messageInEmail = "Hello, ${subscription.user_subscribed.name}! We've got great news!!! It seems that somebody found something that matches your subscription alert criteria. Go and check it out to see if this is your lucky day!
    // www.lostfound.app/found/${_id}
    // findMatchingSubscriptions.forEach(subscription => {
    // sendAlertEmailTo(subscription.user_subscribing.email, messageInEmail)
    // })
    return findMatchingSubscriptions;
  } catch (error: any) {
    console.log(`Error en fn findMatchingSuscriptions. ${error.message}`);
  }
}

// //! EXPERIMENTAL PARA FUTURA FUNCIONALIDAD DE MANDAR EMAIL CON AVISOS :
// export async function alertMatchingSubscriptions(
//   arrayOfMatchingSubcriptions:
//     | LeanDocument<
//         {
//           [x: string]: any;
//         } & Required<{
//           _id: unknown;
//         }>
//       >[]
//     | undefined
// ) {
//   try {
//     // Hacer un Set del arreglo para sacar elementos repetidos y no mandar varios emails a el mismo usuario?

//     // FORMA 1 :
//     arrayOfMatchingSubcriptions.forEach((subscription) => {
//       sendEmail(
//         subscription.user_subscribed.email,
//         messageInEmailOrSomethingElse
//       );
//     });
//     // FORMA 2 :
//     let arrayOfPromises = arrayOfMatchingSubcriptions.map((el) => {
//       sendEmail(
//         subscription.user_subscribed.email,
//         messageInEmailOrSomethingElse
//       );
//     });
//     const promisesFullfilled = Promise.all(arrayOfPromises);
//     // FORMA 3 :
//     for (let i = 0; i < arrayOfMatchingSubscriptions.length; i++) {
//       const element = arrayOfMatchingSubscriptions[i];
//       await sendEmail(element.user_subscribed.email, "mensaje u algo");
//     }
//   } catch (error: any) {
//     console.log(`Error en fn alertMatchingSubscriptions`);
//   }
// }

// async function findAndSendAlertsOfMatchingSubscriptionsOfNewPost(
//   newPost: IPost
// ) {
//   try {
//     const matchingSubscriptions = await findMatchingSuscriptions(newPost);
//     const alertsSent = await alertMatchingSubscriptions(matchingSubscriptions);
//     console.log(alertsSent);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// }