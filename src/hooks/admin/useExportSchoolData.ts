import { teachersService } from "@/services/organization/teachers/teachers.service";
import { useMutation } from "@tanstack/react-query";

export const useExportSchoolData = () => {
    const {
        mutateAsync: exportData,
        isPending: isExporting,
        error: exportError,
    } = useMutation({
        mutationFn: () => teachersService.exportSchoolDataAdmin(),
        onSuccess: (data) => {
            if (!data.success || !data.csv) {
                console.error('Экспорт завершился неудачей на стороне сервера');
                return;
            }
            const BOM = '\uFEFF';
            const csvContent = BOM + data.csv;
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', data.filename || 'students_export.csv');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.error('Ошибка при скачивании CSV:', error);
        }
    })

    return { exportData, isExporting, exportError }
}
