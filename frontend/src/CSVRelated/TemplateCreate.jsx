import stringify from 'csv-stringify';
const axios = require("axios")

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

export function createInputRankingTemplate() {
    const csvHeaders = ['initial', 'semesterid', 'opofficer', 'resmanoff', 'astdev', 'subco', 'subdev', 'dbstaff', 'naofficer', 'nastaff', 'rndofficer', 'rndstaff'];
    const csvContent = [csvHeaders].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'InputLeaderTemplate.csv';
    link.click();

    URL.revokeObjectURL(url);
}


export function createInputPromotionRankingTemplate() {
    const csvHeaders = ['initial', 'opofficer', 'resmanoff', 'astdev', 'subco', 'subdev', 'dbstaff', 'naofficer', 'nastaff', 'rndofficer', 'rndstaff'];
    const csvRows = [csvHeaders];

    axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/promotion/getRegistrees/'+sessionStorage.getItem('selectedSemester')).then((res)=>{
        for (const value of res.data) {
            const row = [value.initial];
            csvRows.push(row);
        }
    
        const csvContent = csvRows.map(row => row.join(',')).join('\n');
      
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
      
        const link = document.createElement('a');
        link.href = url;
        link.download = 'PromotionRankingTemplate.csv';
        link.click();
      
        URL.revokeObjectURL(url);
    })

    // Loop through the values and add them as a new row in the CSV
    
}

export function createInputAssistantRecordTemplate() {
    const csvHeaders = ['initial', 'hcletter', 'astpvletter', 'abscence', 'forgot', 'late', 'toleration', 'leave', 'sick', 'alpha', 'casemakingdl', 'correctiondl', 'teachingabscence', 'teachinglate', 'teachingpermission'];
    const csvContent = [csvHeaders].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'AssistantRecordTemplate.csv';
    link.click();

    URL.revokeObjectURL(url);
}