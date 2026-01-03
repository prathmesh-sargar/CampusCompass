import VideoContainer from "./VideoContainer";
import ButtonList from "./ButtonList";
import NavbarYT from "./NavbarYT";

const HomepageYT = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4">
      
      {/* Search */}
      <div className="pt-[90px] mb-6">
        <NavbarYT />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <ButtonList />
      </div>

      {/* Videos */}
      <VideoContainer />
    </div>
  );
};

export default HomepageYT;
