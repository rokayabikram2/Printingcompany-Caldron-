import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { BaseUrlContext } from '../../App';
import axios from 'axios';

const Mvv = () => {
    const [mission, setMission] = useState([]);
    const baseUrl = React.useContext(BaseUrlContext);


    const missionData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}/navigations/`
            );

            const missionDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "Mission & Vision"
            );
            setMission(missionDatas);
            
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }
    console.log(mission);

    useEffect(() => {
        missionData();
    }, []);
    return (
        <section className='md:py-20 py-16 bg-color4'>
            <div className='container grid xl:grid-cols-3 md:grid-cols-2 gap-10'>
                {mission.map((dataItem) => (
                    <div key={dataItem.title} className='relative w-full border p-4 rounded-xl bg-black text-white bg-cover bg-no-repeat overflow-hidden' style={{ background: `url('${dataItem.back_image}')` }}>
                        <div className='absolute w-full h-full inset-0 bg-black opacity-80'></div>
                        <div className='relative flex flex-col items-center gap-1 z-10'>
                            <h3 className='md:text-xl text-lg font-semibold'>{dataItem.title}</h3>
                            <img src={dataItem.icon_image} alt={dataItem.title} />
                            <p className='text-center sm:text-base text-sm' dangerouslySetInnerHTML={{__html:dataItem.desc.substring(0,150)}}></p>
                            <NavLink to={`/Mvv/${dataItem.title}`} className="flex items-center gap-1 border-b border-color2 text-xs text-color2">Read More<i className="fa-solid fa-arrow-right text-[10px]"></i></NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Mvv;
