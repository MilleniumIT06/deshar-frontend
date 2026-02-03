'use client'

import { type ReactNode } from 'react'

// import { useRouter } from 'next/navigation';

// import { testOptionsDepartment, testOptionsMinistry, testOptionsTeacher, testOptionsVicePrincipal } from '@/mocks/adminMock';
// import useRole from "@/shared/hooks/admin/useRole";
// import { Selector } from '@/shared/ui/Selector';

export const StatisticsLayoutContent = ({ children }: { children: ReactNode }) => {
	// const router = useRouter();
	// const { role } = useRole();

	// let options;
	// switch (role) {
	//     case "teacher":
	//         options = testOptionsTeacher;
	//         break;
	//     case "vicePrincipal":
	//         options = testOptionsVicePrincipal;
	//         break;
	//     case "department":
	//         options = testOptionsDepartment;
	//         break;
	//     case "ministry":
	//         options = testOptionsMinistry;
	//         break;
	//     default:
	//         options = testOptionsTeacher;
	//         break;
	// }

	// const handleSelectChange = (item: { id: string; label: string; default: boolean }) => {
	//     if (role === "department" || role === "vicePrincipal" || role === "ministry") {
	//         if (item.default) {
	//             router.push("/");
	//         } else {
	//             router.push(`/${item.id}`);
	//         }
	//     }
	// };

	return (
		<div className="StatisticLayout__inner">
			<div className="StatisticLayout__head">
				<h1 className="StatisticLayout__title">Общая статистика</h1>
				{/* Selector - предположительно кастомный компонент */}
				{/* <Selector
                    className="StatisticLayout__selector"
                    options={options}
                    onChange={handleSelectChange}
                /> */}
				<span>selector</span>
			</div>
			<div className="StatisticLayout__content">{children}</div>
		</div>
	)
}
