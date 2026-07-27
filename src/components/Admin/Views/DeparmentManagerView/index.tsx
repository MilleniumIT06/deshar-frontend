'use client';
import { ResultsCard } from "@/components/ResultsCard";
import { useGetDistrictStats } from "@/hooks/admin/department/useGetDistrictStats";
import { Loader } from "@/shared/ui/Loader";

import { ClassCardMain } from "../../ClassCardMain";
import { StatisticsBlock } from "../../StatisticsBlock";
import { Table } from "../../Table";
import { getBestStudentsColumns } from "../MinistryManagerView/getBestStudentsColumns";

import type { ManagerTopStudent } from "@/services/types/republic.types";

import './../styles.scss'

const colors = ['#3FC8FA', '#1BAA7D', '#F1C515', '#ED6F09', '#F82754','#EA20FD','#1B8DEB'];
export const DepartmentManagerView = ()=> {
    const {districtStats,isDistrictStatsError,isDistrictStatsLoading} = useGetDistrictStats()
    const transformedSchoolsStats = districtStats?.data.top_schools.map((item,index)=> ({
        name:item.name,
        value:item.total_points,
        fill: colors[index % colors.length]
    })).slice(0,5) ||[]

    const redirectOnBestStudentsClick = ()=> {
        return "test"
    }
    if(isDistrictStatsError)return <div>Error</div>
    return (
         <div className="CommonView">
                    <div className="CommonView__head">
                                    <h1 className="CommonView__title">Общая статистика</h1>
                                </div>
                    <div className="CommonView__statBlocks CommonView__statBlocks--department">
                      {isDistrictStatsLoading?"statistic loading...":<StatisticsBlock data={transformedSchoolsStats} title="Школы"/>}
                    </div>
                    <div className="CommonView__cards CommonView__cards--department">
                         {isDistrictStatsLoading?"statistic loading...": <ResultsCard variant="admin" value={districtStats?.data.statistics.total_points} title="Баллы"/>}
                         {isDistrictStatsLoading?"statistic loading...": <ResultsCard variant="admin" value={districtStats?.data.statistics.average_points} title="Ср. Балл"/>}
                         {isDistrictStatsLoading?"statistic loading...": <ResultsCard variant="admin" value={districtStats?.data.statistics.total_schools} title="Всего школ"/>}
                             {isDistrictStatsLoading?"statistic loading...": <ResultsCard variant="admin" value={districtStats?.data.statistics.total_students} title="Всего учеников"/>}
                                  {isDistrictStatsLoading?"statistic loading...": <ResultsCard variant="admin" value={districtStats?.data.statistics.total_teachers} title="Всего учителей"/>}
                    </div>
                    <div>
                       {isDistrictStatsLoading?<Loader/>:districtStats&&districtStats.data? <ClassCardMain
                        title={'Лучшие ученики среди школ'}
                        linkText="Полный список"
                        linkHref="/">
                        <Table<ManagerTopStudent>
                            data={districtStats.data.top_students}
                            getColumns={() => getBestStudentsColumns()}
                            handleRowClick={redirectOnBestStudentsClick}
                        />
                    </ClassCardMain>:"Error"}
                    </div>
                </div>
    )
}
