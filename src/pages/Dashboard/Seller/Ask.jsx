

import useCart from "../../../Hook/useCart";
import "ka-table/style.css";
import { Table } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { Avatar } from "@nextui-org/react";
import Modaln from "./Modaln";
import { Helmet } from "react-helmet-async";

const Ask = () => {
   const [, refetch] = useCart();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: advertisement = [], refetch: refetchAds} = useQuery({
    queryKey: ["advertisement"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slider/${user?.email}`);
      refetch();
      return res.data;
      
    },
    enabled: !!user?.email,
  });
//   console.log(advertisement);

  const dataArray = advertisement.map((item, index) => ({
    description: item?.description,
    status: item?.status,
    ProfilePicture: item?.photo,
    email: item?.email.slice(0, 25),
    id: index,
  }));

  const handleRefetch = () => {
    refetchAds(); 
    refetch();    
  };

  return (
    <div>
      <Helmet>
        medi corner | ask for banner
      </Helmet>
     
      <div className=" flex    justify-center                items-center  my-16">
        <Modaln refetch={handleRefetch}></Modaln>
       </div>
       <div className=" text-2xl font-bold">
      
       <Table className='overflow-auto'
        columns={[
          { key: "description", title: "description", dataType: DataType.String },
          { key: "status", title: "status", dataType: DataType.String },
          {
            key: "ProfilePicture",
            title: "ProfilePicture",
            dataType: DataType.String,
          },
          { key: "email", title: "email", dataType: DataType.String },
        

         
        ]}
       
        data={dataArray}
        editingMode={EditingMode.Cell}
        rowKeyField={"id"}
         sortingMode={SortingMode.Single}
         format={({ column, value }) => {
           if (column.key === "ProfilePicture") {
            return (
              <Avatar
                className="w-[100px] h-[100px]"
                isBordered
                radius="sm"
                src={value}
              />
            );
          }
        }}
      />
      </div>
    </div>
  );
};

export default Ask;




