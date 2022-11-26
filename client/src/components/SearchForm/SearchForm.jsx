import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/features/user/userThunk";
import { searchPost } from "../../redux/features/post/postThunk";
import { formValidator } from "../../helpers/form-validation";

const SearchForm = () => {
  const countries = useSelector((state) => state.user.countries);
  const results = useSelector((state) => state.post.searchResults);
  const dispatch = useDispatch();
  const currentLang = i18next.language.slice(0, 2);
  const { t } = useTranslation();

  const [search, setSearch] = useState({
    name: "",
    number: "",
    country: "",
    date_lost: "",
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = formValidator(search);
    validation && dispatch(searchPost(search));
  };

  useEffect(() => {
    !countries.lenght && dispatch(getCountries(currentLang));
  }, [dispatch]);

  console.log("ACAAA", countries);
  return (
    <div className="grid md:flex">
      <div className="grid">
        <h1 className="text-3xl font-extralight text-neutral-400 md:text-5xl mt-6 md:ml-12 w-full text-center md:text-start p-2 md:p-0 md:w-1/2">
          {t("searchForm.title")}
        </h1>
        <p className="font-extralight text-indigo-400 text-medium md:text-xl md:ml-12 w-full text-center md:text-start md:w-1/2">
          {t("searchForm.subtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto md:m-8 p-4 sm:p-6 md:p-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-2 gap-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("searchForm.nameLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="name"
              value={search.name}
              type="text"
              placeholder={t("searchForm.namePlaceholder")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("searchForm.numberLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              id="grid-last-name"
              type="text"
              name="number"
              value={search.number}
              placeholder="10.111.213 | 4544-2222-2222-2222"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              {t("searchForm.countryLabel")}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="country"
                onChange={handleChange}
              >
                <option disabled defaultValue=""></option>
                {countries.length &&
                  countries.map((c) => (
                    <option value={c[0]} key={c[0]}>
                      {c[1]}
                    </option>
                  ))}
                {/* <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option> */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              {t("searchForm.dateLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="date"
              placeholder="90210"
              name="date_lost"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="w-full block md:w-1/2 bg-gray-200 hover:bg-emerald-300 hover:text-white border border-emerald-300 rounded py-3 px-4 text-slate-500 md:px-0">
          {t("searchForm.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;