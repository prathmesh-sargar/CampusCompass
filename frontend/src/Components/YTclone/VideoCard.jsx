import axios from 'axios';
import { useEffect, useState } from 'react'
// import { API_KEY } from './contstant/YouTube';

const VideoCard = ({item}) => {

  

  const [ytIcon , setytIcon] = useState("");
  const [title,settitle] = useState("");

  const getchanneldeatail = async()=>{

    try {
      
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=AIzaSyDsKiEvrwMmwWVv6eTfzktIvfX6d8OYZ90`)
            console.log(" channel ID ", res);
            console.log(res.data.items[0].snippet.title);
            settitle(res.data.items[0].snippet.title)
            
          const image = res.data.items[0].snippet.thumbnails.high.url
          setytIcon(image)
      

    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getchanneldeatail();
  },[item.snippet.channelId])


  return (
    <>
   
  <div className="w-[300px] rounded-md ">
   
      <img
        src={item.snippet.thumbnails.medium.url}
        alt="img"
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <div className=''>
          <div className='flex gap-2'>
            <img src={ytIcon}  alt="img" className='rounded-full h-[30px] w-[30px] cover  '
             
            />
            <p>{title}</p>
          </div>

        <h3 className="inline-flex items-center text-start  ml-2">
        {item.snippet.title}
        </h3>
        </div>
       
        {/* <p className='text-semibold text-blue-500'>{item.snippet.channelTitle}</p> */}
        {/* <p>{item.statistics?.viewCount} <span className='text-bold'>views</span>  </p> */}
        <p className="mt-3 text-sm text-gray-600">
        </p>
     
      
      </div>
    </div>
    </>
  )
}

export default VideoCard
