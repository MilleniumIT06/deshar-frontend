'use client';

import { getSchoolAllStudents } from "@/columns/getSchoolAllStudents";
import { Table } from "@/components/Admin/Table";
import { useExportSchoolData } from "@/hooks/admin/useExportSchoolData";
import { useGetAllSchoolStudents } from "@/hooks/admin/useGetAllSchoolStudents";
import { Loader } from "@/shared/ui/Loader";
import { Card } from "@/widgets/AdminWidgets/Card";

export const AllSchoolStudentsPageContent = () => {
    const {allSchoolStudents,isAllSchoolStudentsError,isAllSchoolStudentsLoading} = useGetAllSchoolStudents()
    const { exportData, isExporting } = useExportSchoolData();
    return (
        <main className="PageAdmin">
            <Card
                resetFilters={()=>'resetfilters'}
                title={`Все ученики школы ${allSchoolStudents?.meta.school_name}`}
                valueFirst={`${allSchoolStudents?.meta.total} учеников`}
                csv={true}
				csvIsLoading={isExporting}
				onClickCsvBtn={()=> exportData()}
              >
                {/* <SchoolsTable data={SchoolsMockData} link="/schools/" /> */}
               {isAllSchoolStudentsLoading? <Loader/>:!isAllSchoolStudentsError&& allSchoolStudents&&allSchoolStudents.data.length>0 ? <Table<any, any>
                    data={allSchoolStudents.data}
                    getColumns={() => getSchoolAllStudents()}
                    handleRowClick={()=>'row clie=c'}
                />:"Error"}
            </Card>
        </main>
    )
}
