document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const events = [
        { startYear: 2015, startMonth: 2, endYear: 2018, endMonth: 2, text: '선린인터넷고등학교' },
        { startYear: 2019, startMonth: 6, endYear: 2020, endMonth: 2, text: '유니티 학원' },
        { startYear: 2020, startMonth: 2, endYear: 2021, endMonth: 3, text: '42Seoul' },
        { startYear: 2021, startMonth: 3, endYear: 2021, endMonth: 6, text: 'VR/AR콘텐츠 국비지원' },
        { startYear: 2021, startMonth: 6, endYear: 2024, endMonth: 1, text: '(주)한국가상현실' },
        { startYear: 2023, startMonth: 2, endYear: 2025, endMonth: 2, text: '방송통신대학교' },
    ];

    const timeline = document.getElementById('timeline');
    const eventContainer = document.getElementById('event-container');

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');                                                    //클래스 네임 추가
        eventElement.innerHTML = `${event.text}`;                                           //텍스트 추가
        const leftPosition = ((event.startYear - 2015) + (event.startMonth) / 12) / 9 * 100;    //위치조절
        eventElement.style.left = `${leftPosition}%`;

        // Calculate the width based on end date
        const rightPosition = ((event.endYear - 2015) + (event.endMonth) / 12) / 9 * 100;
        eventElement.style.width = `${rightPosition - leftPosition}%`;

        let topPosition = 0;
        let currentEvent = eventContainer.lastElementChild;
        while (currentEvent) {
            const currentStartYear = parseInt(currentEvent.dataset.startYear);
            const currentStartMonth = parseInt(currentEvent.dataset.startMonth);

            if (event.startYear > currentStartYear || (event.startYear === currentStartYear && event.startMonth > currentStartMonth)) 
            {
                break;
            }

            topPosition += currentEvent.offsetHeight + 20;
            currentEvent = currentEvent.previousElementSibling;
        }

        eventElement.style.top = `${topPosition}px`;
        eventElement.dataset.startYear = event.startYear;
        eventElement.dataset.startMonth = event.startMonth;

        eventContainer.appendChild(eventElement);
    });

    // Add year markers up to the current year
    for (let year = 2015; year <= currentYear; year++) {
    const marker = document.createElement('div');
    marker.classList.add('year-marker');
    marker.style.left = `${(year - 2015) / 9 * 100}%`;
    timeline.appendChild(marker);

    // Add text for the year
    const yearText = document.createElement('div');
    yearText.innerText = year.toString();
    yearText.style.position = 'absolute';
    yearText.style.top = '-25px'; // Adjust position above the timeline
    yearText.style.left = `${(year - 2015) / 9 * 100}%`;
    yearText.style.fontSize = '14px';
    timeline.appendChild(yearText);
}
});