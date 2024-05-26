import { useEffect, useState } from "react";
import { getAllMeters } from "../api/meter";
import Title from "../components/shared/Title";
import Card from "../components/shared/Card";
import { useNavigate } from "react-router-dom";

function Home() {
    const [meters, setMeters] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    getAllMeters()
    .then((res)=>{
        setMeters(res.data.data)
    }).catch((err)=>{
        console.log(err)
    }) 
  }, []);

  const getMeterDetails = (meterId) => {
    navigate(`/meter/${meterId}`)
  }

  return (
    <div className="w-full h-full p-10 md:p-20 flex justify-center">
      <div className="flex flex-wrap w-full gap-5 justify-center">
        {
          meters.map((meter) => (
            <Card key={meter._id} className="cursor-pointer" onClickFn={getMeterDetails} fnParams={[meter._id]}>
                <Title title={meter._id} className="text-lg" />
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
