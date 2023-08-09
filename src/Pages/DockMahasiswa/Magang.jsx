import React from 'react'
import Layout from "../../Components/Layout";
import LayoutTamplate from "../../Components/LayoutTamplate";
import { Link } from "react-router-dom";

export const Magang = () => {
  return (
    <Layout>
      <LayoutTamplate titleHeader={"Dokumentasi Mahasiswa Magang"}>
        <div className="w-full flex justify-center flex-col gap-10">
          <h3 className="text-[23px] px-10 py-5 pb-1 font-bold md:text-start text-center">
            Magang
          </h3>
          <Link
            to="https://drive.google.com/drive/folders/10sakWy9FO5snBkCY721vvB4V4p8OjAzH"
            target="_blank"
            className="underline underline-offset-1 text-green-600 px-10"
          >
            Mahasiswa Aktif
          </Link>
        </div>
      </LayoutTamplate>
    </Layout>
  );
}

export default Magang