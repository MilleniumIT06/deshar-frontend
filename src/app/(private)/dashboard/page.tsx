import { Continue } from "@/components/Continue";
import { OtherSubjects } from "@/components/OtherSubjects";
import { Successes } from "@/components/Successes";
import { TopClassmates } from "@/components/TopClassmates";


export default function Authed() {
	return (
		<main>
			<Successes />
			<Continue />
			<TopClassmates />
			<OtherSubjects />
		</main>
	)
}
