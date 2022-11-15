import axios from "axios";
import React, { useState } from "react";

const EditAdminUser = () => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const saveUpdate = async () => {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/backend/user/updateadmin`,
      {
        fullname: fullname,
        email: email,
        password: password,
      }
    );
  };
  return (
    <div className="overflow-hidden bg-gray-600 shadow sm:rounded-lg mr-20 ml-20">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-white">Edit Admin</h3>
        <p className="mt-1 max-w-2xl text-sm text-white"></p>
      </div>
      <div className="border-t border-gray-500">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <input
              onChange={(val) => setFullname(val.target.value)}
              type="text"
              id="small-input"
              className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <input
              onChange={(val) => setEmail(val.target.value)}
              type="text"
              id="small-input"
              className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Password</dt>
            <input
              onChange={(val) => setPassword(val.target.value)}
              type="text"
              id="small-input"
              className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </dl>
        <button
          onClick={saveUpdate}
          type="button"
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};

EditAdminUser.getLayout = function getLayout(page) {
  return page;
};

export default EditAdminUser;
