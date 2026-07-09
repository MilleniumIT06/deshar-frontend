'use client';

import { getSchoolAllStudents } from "@/columns/getSchoolAllStudents";
import { Table } from "@/components/Admin/Table";
import { useGetAllSchoolStudents } from "@/hooks/admin/useGetAllSchoolStudents";
import { Loader } from "@/shared/ui/Loader";
import { Card } from "@/widgets/AdminWidgets/Card";

export const AllSchoolStudentsPageContent = () => {
    const {schoolClassesData,isLoading,isError} = useGetAllSchoolStudents()
    console.log(schoolClassesData)
    return (
        <main className="PageAdmin">
            <Card
                resetFilters={()=>console.log('resetfilters')}
                title={`Все ученики школы ${schoolClassesData?.meta.school_name}`}
                valueFirst={`${schoolClassesData?.meta.total} учеников`}
              >
                {/* <SchoolsTable data={SchoolsMockData} link="/schools/" /> */}
               {isLoading? <Loader/>:!isError&& schoolClassesData&&schoolClassesData.data.length>0 ? <Table<any, any>
                    data={schoolClassesData.data}
                    getColumns={() => getSchoolAllStudents()}
                    handleRowClick={()=>console.log('row clie=c')}
                />:"Error"}
            </Card>
        </main>
    )
}
