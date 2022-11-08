import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import { toast } from "tailwind-toast";

const Dashboards = () => {
  const router = useRouter();
  const [songList, setSongList] = useState();
  const [isOpenDialogCreate, setOpenDialogCreate] = useState(false);
  const [singerList, setSingerList] = useState();
  const [singerId, setSingerId] = useState();
  const [singerName, setSingerName] = useState();
  const [songLyric, setSongLyric] = useState();
  const [songName, setSongName] = useState();
  const [curentPage, setCurentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    getSongList();
  }, []);

  useEffect(() => {
    getSingerList();
  }, []);

  const getSongList = async () => {
    const response = await axios.get(
      `${process.env.BASE_URL}/api/backend/song/getsongslist?=page=${curentPage}`
    );
    console.log(response);
    setCurentPage(response.data.currentPage);
    setTotalPage(response.data.totalPages);
    setSongList(response.data.data);
  };

  const goToNextPage = async () => {
    setCurentPage(curentPage + 1);
    getSongList();
  };

  const goToPrevPage = async () => {
    setCurentPage(curentPage - 1);
    getSongList();
  };

  const getSingerList = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/backend/singer/getallsinger`
      );
      setSingerList(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const singerItem =
    singerList &&
    singerList.map((item) => ({
      id: item.singerId,
      name: item.singerName,
    }));

  const handleOnSelect = (item) => {
    setSingerId(item.id);
    setSingerName(item.name);
  };

  const handleOnSearch = () => {};

  const handleOnHover = () => {};

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const deleteSong = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/backend/song/deletesongbyid?id=${id}`
      );

      if (res.status == 200) {
        toast()
          .success("Succes!", "Chord berhasil di hapus!")
          .with({
            shape: "pill",
            duration: 6000,
            speed: 1000,
            positionX: "start",
            positionY: "bottom",
            color: "bg-blue-800",
            fontColor: "blue",
            fontTone: 200,
          })
          .show();
        router.reload(window.location.pathname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveSong = async () => {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/backend/song/savesong`,
      {
        songName: songName,
        songLyric: songLyric,
        singerId: singerId,
        singerName: singerName,
      }
    );
    if (res.status == 200) {
      console.log(res);
      setOpenDialogCreate(false);
      toast()
        .success("Succes!", "Chord berhasil di simpan!")
        .with({
          shape: "pill",
          duration: 4000,
          speed: 1000,
          positionX: "start",
          positionY: "bottom",
          color: "bg-blue-800",
          fontColor: "blue",
          fontTone: 200,
        })
        .show();
      router.reload(window.location.pathname);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenDialogCreate(true)}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Tambah Chord
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="min-w-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Judul Lagu</th>
              <th className="py-3 px-6">Penyanyi</th>
              <th className="py-3 px-6">Singer ID</th>
              <th className="py-3 px-6">View</th>
              <th className="mr-20 min-w-10">Action</th>
            </tr>
          </thead>
          <tbody>
            {songList &&
              songList.map((song) => (
                <tr
                  key={song._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {song._id}
                  </th>
                  <td className="py-4 px-6">{song.songName}</td>
                  <td className="py-4 px-6">{song.singerName}</td>
                  <td className="py-4 px-6">{song.singerId}</td>
                  <td className="py-4 px-6">{song.views} views</td>
                  <td className="py-4 px-6 text-right">
                    <ul>
                      <li>
                        <button
                          onClick={() => setOpenDialogCreate(true)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteSong(song._id)}
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

      <Transition appear show={isOpenDialogCreate} as={Fragment}>
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
                    Tambah Chord
                  </Dialog.Title>
                  <div className="mt-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Judul Lagu
                    </label>
                    <input
                      onChange={(e) => setSongName(e.target.value)}
                      type="text"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Judul Lagu.."
                      required
                    />
                  </div>

                  <div className="field mt-10">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                      Penyanyi
                    </label>
                    <ReactSearchAutocomplete
                      items={singerItem}
                      maxResults={15}
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      onClear={handleOnClear}
                      styling={{
                        height: "34px",
                        border: "1px solid darkgreen",
                        borderRadius: "4px",
                        backgroundColor: "white",
                        boxShadow: "none",
                        hoverBackgroundColor: "lightgreen",
                        color: "darkgreen",
                        fontSize: "12px",
                        fontFamily: "Courier",
                        iconColor: "green",
                        lineColor: "lightgreen",
                        placeholderColor: "darkgreen",
                        clearIconMargin: "3px 8px 0 0",
                        zIndex: 3,
                      }}
                    />

                    <span>
                      Penyanyi Terpilih <b>{singerName + `(${singerId})`}</b>?
                    </span>
                  </div>

                  <div className="field mt-10">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                      Chord dan Chord
                    </label>
                    <textarea
                      onChange={(e) => setSongLyric(e.target.value)}
                      id="message"
                      rows="4"
                      required
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Chord..."
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={saveSong}
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

      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Halaman saat ini
          <span className="font-semibold text-gray-900 dark:text-white">
            {" "}
            {curentPage}
          </span>
          <span className="text-sm text-gray-700 dark:text-gray-400">
            {" "}
            dari
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {" "}
            {totalPage}
          </span>{" "}
          Halaman
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={goToPrevPage}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={goToNextPage}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              aria-hidden="true"
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

Dashboards.getLayout = function getLayout(page) {
  return page;
};

export default Dashboards;
