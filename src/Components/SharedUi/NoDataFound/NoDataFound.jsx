import './NoDataFound.css';

const NoDataFound = () => {
  return (
    <div className='flex justify-center items-center flex-col my-20 no-data'>
      <img src="/no-data.png" alt="No Data Found" className=""/>
      <p className='text-white py-3 text-xl'>No Data Found</p>
    </div>
  );
};

export default NoDataFound;
