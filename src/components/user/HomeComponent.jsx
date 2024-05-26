import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSharedStore } from "../../contexts/AlertContext";
import { addNewMeter, getAllMeters } from "../../api/meter";
import { mdiPlus } from "@mdi/js";
import Button from '../shared/Button';
import Card from '../shared/Card';
import Title from "../shared/Title";


function HomeComponent() {
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
      message: `If you confirm this action, a new meter will be created with the name <strong> smart-meter-${meters.length} </strong>`,
      icon: mdiPlus,
      bg: "bg-green-50",
      buttonBg: "bg-green-500",
    })
      .then(() => {
        addNewMeter()
          .then(() => {
            setMeters([...meters, { _id: "smart-meter-" + meters.length }]);
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
      <div className="flex w-full justify-end my-4">
        <Button text="Add Meter " functionToCall={addMeter} />
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

export default HomeComponent;
