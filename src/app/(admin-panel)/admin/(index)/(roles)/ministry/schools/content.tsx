'use client'
import { useRouter } from "next/navigation";

import { getSchoolsColumns } from "@/columns/ministry/getSchoolsColumns";
import { Table } from "@/components/Admin/Table";
import { useGetSchools } from "@/hooks/admin/ministry/useGetSchools";
import { Loader } from "@/shared/ui/Loader";
import { Card } from "@/widgets/AdminWidgets/Card"

import type { IMinistrySchool } from '@/services/types/ministy.types'

export const MinistrySchoolsAdminPageContent = ()=> {
     const router = useRouter();
   const {isMinistrySchoolsError,isMinistrySchoolsLoading,ministrySchools} = useGetSchools();
     if(isMinistrySchoolsLoading) return <div><Loader/></div>
     if(isMinistrySchoolsError) return "Error"
         const handleItemClick = (item:IMinistrySchool)=> {
             router.push(`schools/${item.id}`)
         }
    return <div className="PageAdmin">
         <Card resetFilters={()=>'test'} title="Школы" valueFirst={`Всего школ ${ministrySchools?.meta.total_schools}`}>
                   {ministrySchools&&ministrySchools.data&&ministrySchools.data.length>0 ? <Table<IMinistrySchool,any> data={ministrySchools.data} handleRowClick={handleItemClick} getColumns={()=>getSchoolsColumns()}/> : "Данных нет"}
               </Card>
    </div>
}
