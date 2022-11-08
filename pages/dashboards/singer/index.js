import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
const SingerDashboard = () => {
  const router = useRouter();
  const [singerList, setSingerList] = useState();
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [singerName, setSingerName] = useState();

  useEffect(() => {
    getSingerList();
  }, []);

  const getSingerList = async () => {
    console.log(process.env.BASE_URL);
    const response = await axios.get(
      `${process.env.BASE_URL}/api/backend/singer/getsingerlist`
    );
    setSingerList(response.data.data);
  };

  const saveSinger = async () => {
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/backend/singer/savesinger`,
        {
          singerName: singerName,
        }
      );
      if (res.status == 200) {
        setOpenDialogCreate(false);
        router.reload(window.location.pathname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSinger = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/backend/singer/deletesingerbyid?id=${id}`
      );

      if (res.status == 200) {
        router.reload(window.location.pathname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenDialogCreate(true)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Tambah Penyanyi
      </button>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="min-w-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Penyanyi</th>
              <th className="py-3 px-6">Slug</th>
              <th className="py-3 px-6">ID Penyanyi</th>
              <th className="mr-20 min-w-10">Action</th>
            </tr>
          </thead>
          <tbody>
            {singerList &&
              singerList.map((singer) => (
                <tr
                  key={singer._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {singer._id}
                  </th>
                  <td className="py-4 px-6">{singer.singerName}</td>
                  <td className="py-4 px-6">{singer.slug}</td>
                  <td className="py-4 px-6">{singer.singerId}</td>
                  <td className="py-4 px-6 text-right">
                    <ul>
                      <li>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteSinger(singer._id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Transition appear show={openDialogCreate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setOpenDialogCreate(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Tambah Penyanyi
                  </Dialog.Title>
                  <div className="mt-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Judul Lagu
                    </label>
                    <input
                      onChange={(e) => setSingerName(e.target.value)}
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Judul Lagu.."
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={saveSinger}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setOpenDialogCreate(false)}
                      type="button"
                      className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

SingerDashboard.getLayout = function getLayout(page) {
  return page;
};

export default SingerDashboard;
