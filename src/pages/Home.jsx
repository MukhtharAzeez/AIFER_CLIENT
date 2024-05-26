import { useEffect, useState } from "react";
import { addNewMeter, getAllMeters } from "../api/meter";
import Title from "../components/shared/Title";
import Card from "../components/shared/Card";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import { useSharedStore } from "../contexts/AlertContext";
import { mdiPlus } from "@mdi/js";

function Home() {
  const [meters, setMeters] = useState([]);
  const navigate = useNavigate();
  const { showAlert, emptyAlert } = useSharedStore();

  useEffect(() => {
    getAllMeters()
      .then((res) => {
        setMeters(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getMeterDetails = (meterId) => {
    navigate(`/meter/${meterId}`);
  };

  const addMeter = () => {
    showAlert({
      title: "Create New Meter",
      message: `If you confirm this action, a new meter will be created with the name smart-meter-${meters.length}`,
      icon: mdiPlus,
      bg: "bg-green-50",
      buttonBg: "bg-green-500",
    })
      .then(() => {
        addNewMeter()
          .then(() => {
            setMeters([...meters, {_id: 'smart-meter-' + (meters.length)}]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {})
      .finally(() => {
        emptyAlert();
      });
  };

  return (
    <div className="w-full h-full p-10 md:p-20 flex flex-col justify-center">
      <div className="flex w-full justify-end">
        <Button text="Add Meter" functionToCall={addMeter} />
      </div>
      <div className="flex flex-wrap w-full gap-5 justify-center">
        {meters.map((meter) => (
          <Card
            key={meter._id}
            className="cursor-pointer"
            onClickFn={getMeterDetails}
            fnParams={[meter._id]}
          >
            <Title title={meter._id} className="text-lg" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
