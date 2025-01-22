import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function SkeletonCode({profile}) {

  const [timer, setTimer] = React.useState(true);

  // const profile = {
  //   file : "u2.jpg",
  //   first: "yash",
  //   last : "bapo",
  //   h : ['k',"as","y"]
  // }

  setTimeout(() => {
    setTimer(false)
  }, 1200);

  // console.log(profile[0].lastname);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {
        timer ? 
        <>
          <Stack spacing={1} animation="wave" className='flex items-center justify-center'>
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton animation="wave" variant="circular" width={200} height={200} />
          {/* For variant="text", adjust the height via font-size */}
          <br/>
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '4rem' }} width={400} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '2.5rem' }} width={400} />
          <br/>
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} width={400} />
          <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} width={400} />

          {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
          {/* <Skeleton variant="rounded" width={210} height={60} /> */}
        </Stack>
        </>
        :
        <>
          <div className='flex flex-col justify-center items-center'>
            <img src={`../public/${profile[0].file}`} className='border border-2 border-black rounded-full' width={200} height={200} alt="" />
            <br/>
            <h1 className='text-5xl font-bold font-serif text-purple-800'>{profile[0].firstname + " " +profile[0].lastname}</h1>
            <h1 className='text-2xl font-bold font-serif text-red-500 mt-2'>b@gmail.com</h1>
            <br/>
            <div className='w-full justify-start gap-6 flex'>
            <h1 className='text-xl'>Skill :- </h1>
            <h1 className='text-xl'>{profile[0].skill.join(", ")}</h1>
            </div>
            <div className='w-full mt-1 gap-6 justify-start flex'>
            <h1 className='text-xl'>Skill :- </h1>
            <h1 className='text-xl'>{profile[0].hobby.join(", ")}</h1>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default SkeletonCode;