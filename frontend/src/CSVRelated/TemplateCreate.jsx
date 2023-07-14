import stringify from 'csv-stringify';

export function createAssistantInsertTemplate() {
    const csvHeaders = ['Initial', 'Assistant Name'];
    const csvContent = [csvHeaders].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'InputAssistantTemplate.csv';
    link.click();

    URL.revokeObjectURL(url);
}

export function createInputAssistantLeaderTemplate() {
    const csvHeaders = ['Initial', 'Leader'];
    const csvContent = [csvHeaders].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'InputLeaderTemplate.csv';
    link.click();

    URL.revokeObjectURL(url);
}
