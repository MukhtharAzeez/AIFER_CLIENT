import Icon from "@mdi/react";

const Alert = ({ alert }) => {
  const agree = () => {
    alert.resolve();
  };

  const cancel = () => {
    alert.reject("cancel");
  };

  return (
    <div className="w-full h-screen bg-slate-800 bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full md:w-1/3 mx-auto">
        <div className="flex flex-col p-5 rounded-lg shadow bg-white dark:bg-slate-900">
          <div className="flex flex-col items-center text-center">
            <div className={`inline-block p-4 rounded-full ${alert.bg}`}>
              <Icon path={alert.icon} size="24" className={alert.color} />
            </div>
            <h2 className="mt-2 font-semibold text-gray-800 dark:text-gray-200">
              {alert.title}
            </h2>
            <p
              className="mt-2 text-sm text-gray-600 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: alert.message }}
            >
              {/* {alert.message} */}
            </p>
          </div>

          <div className="flex items-center mt-3">
            <button
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              onClick={cancel}
            >
              Cancel
            </button>

            <button
              className={`flex-1 px-4 py-2 ml-2 text-white text-sm font-medium rounded-md ${alert.buttonBg}`}
              onClick={agree}
            >
              Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
