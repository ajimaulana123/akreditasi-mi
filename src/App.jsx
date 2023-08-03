import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import DocAkreditasi from "./Pages/DocAkreditasi/DocAkreditasi";
import InformasiDosen from "./Pages/InformasiDosen";
import InformasiMahasiswa from "./Pages/InformasiMahasiswa";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "./Context/Context";
import ProfilJurusan from "./Pages/DocJurusan/ProfilJurusan";
import Kurikulum from "./Pages/DocJurusan/Kurikulum";
import Jadwal from "./Pages/DocJurusan/Jadwal";
import SaranaPrasaranaImage from "./Pages/SaranaPrasarana/SaranaPrasaranaImage";
import KaryaMahasiswa from "./Pages/DocJurusan/KaryaMahasiswa";
import Bpk from "./Pages/Download/Bpk";
import Rps from "./Pages/Download/Rps";
import KontrakKuliah from "./Pages/Download/KontrakKuliah";
import Penelitian from "./Pages/Download/Penelitian";
import Pengabdian from "./Pages/Download/Pengabdian";
import Sertifikat from "./Pages/Download/Sertifikat";
import InputDataAll from "./Pages/InputDataAll";
import Formulir from "./Pages/PenjaminanMutu/Formulir";
import Sop from "./Pages/PenjaminanMutu/Sop";
import Pedoman from "./Pages/PenjaminanMutu/Pedoman";
import Renstra from "./Pages/PenjaminanMutu/Renstra";
import Rip from "./Pages/PenjaminanMutu/Rip";
import PenelitianLppm from "./Pages/lppm/PenelitianLppm";
import PengabdianLppm from "./Pages/lppm/PengabdianLppm";
import Jurnal from "./Pages/lppm/Jurnal";
import Haki from "./Pages/lppm/Haki";
import RoadMap from "./Pages/lppm/RoadMap";
import PedomanLppm from "./Pages/lppm/PedomanLppm";
import RenstraLppm from "./Pages/lppm/RenstraLppm";

const App = () => {
  const { globalState } = useContext(GlobalState);
  const [visitorId, setVisitorId] = useState(null);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  
  useEffect(() => {
    const getVisitorId = () => {
      const existingVisitorId = localStorage.getItem("visitorId");
      if (existingVisitorId) {
        return existingVisitorId;
      } else {
        const newVisitorId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem("visitorId", newVisitorId);
        return newVisitorId;
      }
    };

    const resetVisitorId = () => {
      const newVisitorId = Math.random().toString(36).substr(2, 9);
      const previousVisitorIds = localStorage.getItem("previousVisitorIds");
      if (previousVisitorIds) {
        const parsedPreviousVisitorIds = JSON.parse(previousVisitorIds);
        parsedPreviousVisitorIds.push(localStorage.getItem("visitorId"));
        localStorage.setItem(
          "previousVisitorIds",
          JSON.stringify(parsedPreviousVisitorIds)
        );
      } else {
        localStorage.setItem(
          "previousVisitorIds",
          JSON.stringify([localStorage.getItem("visitorId")])
        );
      }
      localStorage.setItem("visitorId", newVisitorId);
      return newVisitorId;
    };

    const handleBeforeUnload = () => {
      const updatedTotalVisitors = totalVisitors + 1;
      setTotalVisitors(updatedTotalVisitors);
      localStorage.setItem("totalVisitors", updatedTotalVisitors);
      resetVisitorId();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const allVisitorIds = Object.keys(localStorage);
    setTotalVisitors(
      parseInt(localStorage.getItem("totalVisitors")) || allVisitorIds.length
    );
    setUniqueVisitors(new Set(allVisitorIds).size);
    setVisitorId(getVisitorId());

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [totalVisitors]);

  useEffect(() => {
    const metaData = () => {
      document.title =
        typeof globalState?.page === "string"
          ? globalState.page
          : globalState.page.page;
    };

    metaData();
  }, [globalState]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dokumentasi-jurusan/profil-jurusan"
          element={<ProfilJurusan />}
        />
        <Route path="/dokumentasi-jurusan/kurikulum" element={<Kurikulum />} />
        <Route path="/dokumentasi-jurusan/jadwal" element={<Jadwal />} />
        <Route
          path="/dokumentasi-jurusan/karya-mahasiswa"
          element={<KaryaMahasiswa />}
        />
        <Route path="/pendukung-akreditasi" element={<DocAkreditasi />} />
        <Route path="/sarana-prasarana" element={<SaranaPrasaranaImage />} />
        <Route path="/informasi-dosen" element={<InformasiDosen />} />
        <Route path="/informasi-mahasiswa" element={<InformasiMahasiswa />} />
        <Route path="/download/bpk" element={<Bpk />} />
        <Route path="/download/rps" element={<Rps />} />
        <Route path="/download/kontrak-kuliah" element={<KontrakKuliah />} />
        <Route path="/download/penelitian" element={<Penelitian />} />
        <Route path="/download/pengabdian" element={<Pengabdian />} />
        <Route path="/download/sertifikat" element={<Sertifikat />} />
        <Route path="/input-data" element={<InputDataAll />} />
        <Route path="/penjaminan-mutu/formulir" element={<Formulir />} />
        <Route path="/penjaminan-mutu/sop" element={<Sop />} />
        <Route path="/penjaminan-mutu/pedoman" element={<Pedoman />} />
        <Route path="/penjaminan-mutu/renstra" element={<Renstra />} />
        <Route path="/penjaminan-mutu/rip" element={<Rip />} />
        <Route path="/lppm/penelitian" element={<PenelitianLppm />} />
        <Route path="/lppm/pengabdian" element={<PengabdianLppm />} />
        <Route path="/lppm/jurnal" element={<Jurnal />} />
        <Route path="/lppm/haki" element={<Haki />} />
        <Route path="/lppm/road-map" element={<RoadMap />} />
        <Route path="/lppm/pedoman" element={<PedomanLppm />} />
        <Route path="/lppm/renstra" element={<RenstraLppm />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
