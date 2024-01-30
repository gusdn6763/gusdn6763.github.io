document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const events = [
        { startYear: 2015, startMonth: 2, endYear: 2018, endMonth: 2, text: '선린인터넷고등학교' },
        { startYear: 2019, startMonth: 6, endYear: 2020, endMonth: 2, text: '유니티 학원' },
        { startYear: 2020, startMonth: 2, endYear: 2021, endMonth: 4, text: '42Seoul' },
        { startYear: 2021, startMonth: 4, endYear: 2021, endMonth: 9, text: 'VR/AR콘텐츠 교육' },
        { startYear: 2021, startMonth: 6, endYear: 2024, endMonth: 1, text: '(주)한국가상현실' },
        { startYear: 2023, startMonth: 2, endYear: 2025, endMonth: 2, text: '방송통신대학교' },
    ];
    const rainbowColors = generateRainbowColors(events.length);
    const timeline = document.getElementById('timeline');
    const eventContainer = document.getElementById('event-container');

    events.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');                                                    //클래스 네임 추가
        const leftPosition = ((event.startYear - 2015) + (event.startMonth) / 12) / 9 * 100;    //위치조절
        eventElement.style.left = `${leftPosition}%`;
        
        // Calculate the width based on end date
        const rightPosition = ((event.endYear - 2015) + (event.endMonth) / 12) / 9 * 100;
        eventElement.style.width = `${rightPosition - leftPosition}%`;
        eventElement.style.height = `25px`;

        eventElement.style.backgroundColor = rainbowColors[index]; // Set rainbow color
        eventElement.dataset.startYear = event.startYear;
        eventElement.dataset.startMonth = event.startMonth;
        eventElement.style.top = '0px';
        const overlappingEvent = findOverlappingEvent(events, index, leftPosition);
        if (overlappingEvent) {
            const newTop = parseInt(overlappingEvent.style.top) + 30; // Adjust this value based on your design
            eventElement.style.top = `${newTop}px`;
        }

        eventContainer.appendChild(eventElement);

        const lineElement = document.createElement('div');
        lineElement.classList.add('event-line');
        lineElement.style.left = `calc(${leftPosition}%)`; // Adjust position based on your design
        const eventTop = parseFloat(eventElement.style.top);
        lineElement.style.top = `${eventTop + 10}px`; // Adjust the distance from the event box
        lineElement.style.height = `${(index + 5) * 5 + 15}px`;
        lineElement.style.borderLeft = `1px dotted ${rainbowColors[index]}`; // Adjust the line color
        eventContainer.appendChild(lineElement);

        // Create a text element for the line
        const textElement = document.createElement('div');
        textElement.innerText = event.text; // You can customize the displayed text
        textElement.classList.add('event-line-text');
        textElement.style.left = `calc(${leftPosition}%)`; // Adjust position based on your design
        const textTop = parseFloat(lineElement.style.height) + eventTop;
        textElement.style.top = `${textTop + 10}px`; // Adjust the distance from the event box
        eventContainer.appendChild(textElement);
    });

    function findOverlappingEvent(events, currentIndex, leftPosition) 
    {
        for (let i = 0; i < currentIndex; i++) 
        {
            const otherEvent = events[i];
            const otherLeft = ((otherEvent.startYear - 2015) + (otherEvent.startMonth) / 12) / 9 * 100;
            const otherRight = ((otherEvent.endYear - 2015) + (otherEvent.endMonth) / 12) / 9 * 100;

            if (leftPosition < otherRight && otherLeft < leftPosition) {
                return document.querySelector(`.event[data-start-year="${otherEvent.startYear}"][data-start-month="${otherEvent.startMonth}"]`);
            }
        }
        return null;
    }

    function generateRainbowColors(count) {
        const colors = [];
        const hueStep = 360 / count;

        for (let i = 0; i < count; i++) {
            const hue = i * hueStep;
            const color = `hsl(${hue}, 100%, 60%)`; // Adjust saturation and lightness as needed
            colors.push(color);
        }

        return colors;
    }

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