'use client';

import { useGetRepublicStats } from "@/hooks/queries/ministry/useGetRepublicStats";
import { Loader } from "@/shared/ui/Loader";
import { Selector } from "@/shared/ui/Selector";

import { getBestStudentsColumns } from "./getBestStudentsColumns";
import { ClassCardMain } from "../../ClassCardMain";
import { StatisticsBlock } from "../../StatisticsBlock";
import './styles.scss'
import { Table } from "../../Table";

import type { ManagerTopStudent } from "@/services/types/republic.types";

const colors = ['#3FC8FA', '#1BAA7D', '#F1C515', '#ED6F09', '#F82754','#EA20FD','#1B8DEB'];
export const MinistryManagerView = ()=> {
    const {republicStats,isLoading} = useGetRepublicStats()
    const transformedDistricStats = republicStats?.data.top_districts.map((item,index)=> ({
        name:item.name,
        value:item.total_points,
        fill: colors[index % colors.length]
    })).slice(0,5) ||[]
    const transformedSchoolsStats = republicStats?.data.top_schools.map((item,index)=> ({
        name:item.name,
        value:item.total_points,
        fill: colors[index % colors.length]
    })).slice(0,5) ||[]
    const redirectOnBestStudentsClick = ()=> {
        return "test"
    }
    const handleSelectChange = () => {
            console.log('ddsa')
        }
    return (
        <div className="MinistryManagerView">
            <div className="MinistryManagerView__head">
                            <h1 className="MinistryManagerView__title">Общая статистика</h1>
                            <Selector className="MinistryManagerView__selector" options={[{id:'1',label:"dd",default:true}]} onChange={handleSelectChange} />
                        </div>
            <div className="MinistryManagerView__statBlocks">
                {isLoading?"statistic loading...":<StatisticsBlock data={transformedDistricStats} title="Районы"/>}
              {isLoading?"statistic loading...":<StatisticsBlock data={transformedSchoolsStats} title="Школы"/>}
            </div>
            <div>
               {isLoading?<Loader/>:republicStats&&republicStats.data? <ClassCardMain
				title={'Лучшие ученики среди школ'}
				linkText="Полный список"
				linkHref="/">
				<Table<ManagerTopStudent, any>
					data={republicStats.data.top_students}
					getColumns={() => getBestStudentsColumns()}
					handleRowClick={redirectOnBestStudentsClick}
				/>
			</ClassCardMain>:"Error"}
            </div>
        </div>
    )
}
