'use client';

import { getBestStudentsColumns } from "@/columns/getBestStudentsColumns";
import { ResultsCard } from "@/components/ResultsCard";
import { useGetSchoolStatistic } from "@/hooks/admin/statistic/useGetSchoolStatistic";
import { useGetAllSchoolStudents } from "@/hooks/admin/useGetAllSchoolStudents";
import { barChartMockData, TEST_CLASSMATES } from "@/mocks/adminMock";
import { Loader } from "@/shared/ui/Loader";
import { MainChart } from "@/widgets/AdminWidgets/MainChart";

import { ClassCardMain } from "../../ClassCardMain";
import { Table } from "../../Table";

import type { Student } from "@/shared/types/admin/types";
import { ISchoolAllStudents } from "@/services/admin/stats.service";
import { getSchoolBestStudentsColumns } from "@/columns/getSchoolBestStudentsColumns";

// import { StatisticsBlock } from "../../StatisticsBlock";

export const SchoolManagerView = ()=> {
    const {schoolStatisticAdminData,isLoading:isSchoolStatisticsLoading} =useGetSchoolStatistic()
    const {allSchoolStudents,isAllSchoolStudentsError,isAllSchoolStudentsLoading} = useGetAllSchoolStudents()
        const redirectOnBestStudentsClick = (item: ISchoolAllStudents) => {
            return item
        }
    return (
            <div>
                <MainChart data={barChartMockData} title="Суммарная успеваемость школы" />
                <div className="MainStatisticPageContent__result_cards">
                    {isSchoolStatisticsLoading ? <Loader/>: schoolStatisticAdminData && <>

                        <ResultsCard
                                    percent={25}
                                    period={7}
                                    value={schoolStatisticAdminData.statistics.school_progress.total_xp}
                                    title="Баллов набрано"
                                    mode='value'
                                    variant='admin'
                                    icon={<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.29596 1.77051C7.09669 0.744044 8.64952 0.744045 9.45026 1.77051L10.3155 2.87988C10.7778 3.47247 11.3981 3.92316 12.1046 4.17969L13.4278 4.66016C14.6513 5.10458 15.1312 6.58147 14.4024 7.66016L13.6143 8.82617C13.1936 9.44893 12.9564 10.1776 12.9307 10.9287L12.8829 12.3359C12.8382 13.6368 11.5822 14.5492 10.3311 14.1895L8.97858 13.8008C8.25627 13.5931 7.48994 13.5931 6.76764 13.8008L5.4151 14.1895C4.16406 14.5492 2.90802 13.6368 2.86334 12.3359L2.81549 10.9287C2.78982 10.1776 2.55263 9.44893 2.1319 8.82617L1.34381 7.66016C0.61506 6.58147 1.09488 5.10458 2.31842 4.66016L3.64166 4.17969C4.3481 3.92316 4.96845 3.47247 5.43073 2.87988L6.29596 1.77051Z" stroke="#060606" strokeWidth="2"/>
    <path d="M4.87311 17.123H10.8731" stroke="#060606" strokeWidth="2" strokeLinecap="round"/>
    </svg>}
                                />
                                <ResultsCard
                                    percent={0}
                                    period={7}
                                    title="Модулей выполнено"
                                    value={schoolStatisticAdminData.statistics.school_progress.completed_modules_total}
                                    mode='value'
                                    variant='admin'
                                />
                                </>
    }
                </div>
                <ClassCardMain
                    title={'Лучшие ученики школы'}
                    linkText="Полный список"
                    linkHref="/">
                    {/* <ClassTable data={TEST_CLASSMATES} type='classmates' /> */}
                    {
                        isAllSchoolStudentsLoading?<Loader/>:
                        !isAllSchoolStudentsError&&allSchoolStudents&&allSchoolStudents.data?

                    <Table<ISchoolAllStudents, any>
                        data={allSchoolStudents.data}
                        getColumns={() => getSchoolBestStudentsColumns()}
                        handleRowClick={redirectOnBestStudentsClick}
                        />:"Errors"
                    }
                </ClassCardMain>
            </div>
        )
}
