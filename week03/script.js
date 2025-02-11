function showChart(stock) {
    document.getElementById('candlestick-container').style.display = 'block';
    
    const ctx = document.getElementById('candlestickChart').getContext('2d');
    if (window.candleChart) {
        window.candleChart.destroy();
    }
    
    const sampleData = {
        AAPL: [
            { t: 1700000000000, o: 150, h: 155, l: 148, c: 153 },
            { t: 1700086400000, o: 153, h: 158, l: 151, c: 157 }
        ],
        MSFT: [
            { t: 1700000000000, o: 289, h: 295, l: 285, c: 292 },
            { t: 1700086400000, o: 292, h: 298, l: 290, c: 295 }
        ],
        RELIANCE: [
            { t: 1700000000000, o: 2750, h: 2780, l: 2730, c: 2775 },
            { t: 1700086400000, o: 2775, h: 2800, l: 2755, c: 2785 }
        ]
    };
    
    window.candleChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: stock + ' Candlestick Chart',
                data: sampleData[stock],
                borderColor: 'blue',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { type: 'timeseries' },
                y: { beginAtZero: false }
            }
        }
    });
}
