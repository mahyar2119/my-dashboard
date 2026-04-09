/* ============================================================
   charts.js — Animated charts using Chart.js
   ============================================================ */

const Charts = (() => {
  'use strict';

  let chartInstances = {};

  /* ── Shared chart defaults ── */
  function getDefaults() {
    const isDark = document.body.classList.contains('theme-dark');
    return {
      gridColor:   isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      textColor:   isDark ? '#6e6a90' : '#8580a0',
      tooltipBg:   isDark ? '#1c1935' : '#ffffff',
      tooltipText: isDark ? '#ebe9f8' : '#111028',
    };
  }

  /* ── Weekly Ticket Volume Bar Chart ── */
  function renderWeekly() {
    const canvas = document.getElementById('chart-weekly');
    if (!canvas) return;
    if (chartInstances.weekly) chartInstances.weekly.destroy();

    const d = getDefaults();

    chartInstances.weekly = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Open',
            data: [8, 12, 10, 15, 9, 4, 3],
            backgroundColor: 'rgba(108,99,255,0.7)',
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Resolved',
            data: [6, 10, 11, 13, 8, 3, 2],
            backgroundColor: 'rgba(16,185,129,0.7)',
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
          delay: (ctx) => ctx.dataIndex * 50,
        },
        plugins: {
          legend: {
            labels: {
              color: d.textColor,
              font: { family: 'DM Sans', size: 12 },
              boxWidth: 12,
              borderRadius: 4,
            }
          },
          tooltip: {
            backgroundColor: d.tooltipBg,
            titleColor: d.tooltipText,
            bodyColor: d.textColor,
            borderColor: 'rgba(108,99,255,0.2)',
            borderWidth: 1,
            cornerRadius: 10,
            padding: 12,
          }
        },
        scales: {
          x: {
            grid: { color: d.gridColor },
            ticks: { color: d.textColor, font: { family: 'DM Sans', size: 12 } },
          },
          y: {
            grid: { color: d.gridColor },
            ticks: { color: d.textColor, font: { family: 'DM Sans', size: 12 } },
            beginAtZero: true,
          }
        }
      }
    });
  }

  /* ── Monthly CSAT Line Chart ── */
  function renderCsat() {
    const canvas = document.getElementById('chart-csat');
    if (!canvas) return;
    if (chartInstances.csat) chartInstances.csat.destroy();

    const d = getDefaults();

    chartInstances.csat = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'CSAT %',
          data: [88, 85, 90, 87, 92, 91, 93, 90, 94, 92, 95, 94],
          borderColor: '#6C63FF',
          backgroundColor: 'rgba(108,99,255,0.08)',
          pointBackgroundColor: '#6C63FF',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1200,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: d.tooltipBg,
            titleColor: d.tooltipText,
            bodyColor: d.textColor,
            borderColor: 'rgba(108,99,255,0.2)',
            borderWidth: 1,
            cornerRadius: 10,
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}% satisfaction`
            }
          }
        },
        scales: {
          x: {
            grid: { color: d.gridColor },
            ticks: { color: d.textColor, font: { family: 'DM Sans', size: 12 } },
          },
          y: {
            grid: { color: d.gridColor },
            ticks: {
              color: d.textColor,
              font: { family: 'DM Sans', size: 12 },
              callback: v => v + '%'
            },
            min: 80,
            max: 100,
          }
        }
      }
    });
  }

  /* ── Render visible charts ── */
  function renderVisible() {
    const weeklyPage = document.getElementById('page-dashboard');
    const csatPage   = document.getElementById('page-performance');

    if (weeklyPage && weeklyPage.classList.contains('active')) renderWeekly();
    if (csatPage   && csatPage.classList.contains('active'))   renderCsat();
  }

  /* ── Init: render charts when their page is first shown ── */
  function init() {
    // Render weekly chart when dashboard page is shown
    const observer = new MutationObserver(() => {
      renderVisible();
    });

    const pages = document.querySelectorAll('#page-dashboard, #page-performance');
    pages.forEach(page => {
      observer.observe(page, { attributes: true, attributeFilter: ['class'] });
    });

    // Also re-render when theme changes (colors need updating)
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      // Small delay for CSS vars to update
      setTimeout(renderVisible, 50);
    });
  }

  return { init, renderVisible, renderWeekly, renderCsat };
})();
