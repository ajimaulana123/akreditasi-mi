import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Context/Context";
import Layout from "../../Components/Layout";
import LayoutTamplate from "../../Components/LayoutTamplate";
import { useGetData } from "../../hooks/apiMethod";
import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Kebijakan = () => {
  const apiUrl = "https://knowledgeable-painted-guarantee.glitch.me/kebijakan";
  const { dispatch } = useContext(GlobalState);
  const { datas, isLoading } = useGetData(apiUrl);
  useEffect(() => {
    dispatch({
      type: "UPDATE_PAGE",
      payload: { page: "Penjaminan Mutu", subPage: "Kebijakan" },
    });
  }, []);
  return (
    <Layout>
      <LayoutTamplate titleHeader={"Dokument Inti Penjaminan Mutu Kebijakan"}>
        <TableContainer className="w-full">
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th className="text-base w-[50px]">No</Th>
                <Th className="text-base">Deskripsi</Th>
                <Th className="text-base text-center">Link</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={6}>Loading...</Td>
                </Tr>
              ) : (
                datas.map((data, index) => (
                  <Tr key={index}>
                    <Td className="text-center">{index + 1}</Td>
                    <Td>{data.deskripsi}</Td>
                    <Td>
                      <Link
                        href={data.link}
                        isExternal
                        className="flex justify-center"
                      >
                        <BiSolidFileDoc />
                      </Link>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </LayoutTamplate>
    </Layout>
  );
};

export default Kebijakan;
