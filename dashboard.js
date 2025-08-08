// Dashboard data and component for the rewards app issues infographic.
// This file exports no names but instead mounts the Dashboard into the page when loaded.
// It relies on React and ReactDOM being loaded globally (via the UMD builds).

// Issue data used by the dashboard. Each entry contains the metadata needed to
// render the bar chart, cards and table. Percentages are strings to preserve
// the formatting used in the infographic.
const ISSUES = [
  {
    id: 'auth',
    title: 'Auth friction & failures',
    sev: 'sev-1',
    severityLabel: 'Critical & widespread',
    mentions: 150,
    prevalence: '≈22%',
    quote: 'I have to log in every single time I open the app, and the 2FA code never arrives on time.'
  },
  {
    id: 'crash',
    title: 'App unavailable / crashes',
    sev: 'sev-1',
    severityLabel: 'Critical & widespread',
    mentions: 130,
    prevalence: '≈19%',
    quote: '7/10 times it won\'t load — just endless spinners or “temporary problems.”'
  },
  {
    id: 'barcode',
    title: 'Card / barcode failures',
    sev: 'sev-1',
    severityLabel: 'Critical & widespread',
    mentions: 100,
    prevalence: '≈15%',
    quote: 'The barcode won\'t scan and the card page takes ages to appear at checkout.'
  },
  {
    id: 'offers',
    title: 'Grocery offers flow',
    sev: 'sev-2',
    severityLabel: 'High impact & common',
    mentions: 80,
    prevalence: '≈12%',
    quote: 'Offers require a separate login on an external site that often doesn\'t recognise my credentials.'
  },
  {
    id: 'biometrics',
    title: 'Biometrics ignored',
    sev: 'sev-2',
    severityLabel: 'High impact & common',
    mentions: 60,
    prevalence: '≈9%',
    quote: 'Fingerprint unlock is enabled but still demands full login and code every time.'
  },
  {
    id: 'connectivity',
    title: 'Connectivity & compatibility',
    sev: 'sev-2',
    severityLabel: 'High impact & common',
    mentions: 50,
    prevalence: '≈7%',
    quote: 'Claims there\'s no internet even on Wi‑Fi, and forced updates break older devices.'
  },
  {
    id: 'points',
    title: 'Points / redemption failures',
    sev: 'sev-2',
    severityLabel: 'High impact & common',
    mentions: 40,
    prevalence: '≈6%',
    quote: 'Gift cards never arrive and points often go missing without explanation.'
  },
  {
    id: 'ux',
    title: 'UI / UX flaws',
    sev: 'sev-3',
    severityLabel: 'Moderate impact',
    mentions: 30,
    prevalence: '≈4%',
    quote: 'Icons are invisible in dark mode and navigation feels amateurish.'
  },
  {
    id: 'support',
    title: 'Support & communication',
    sev: 'sev-3',
    severityLabel: 'Moderate impact',
    mentions: 20,
    prevalence: '≈3%',
    quote: 'Broken contact links, bots, and canned replies—nobody actually helps.'
  },
  {
    id: 'workarounds',
    title: 'Workarounds / churn',
    sev: 'sev-4',
    severityLabel: 'Downstream outcome',
    mentions: 15,
    prevalence: '≈2%',
    quote: 'I just use the physical card or switch to other loyalty programmes—this app isn\'t worth it.'
  }
];

/**
 * Simple interactive dashboard built with React. It renders:
 *  - a hero section summarising key stats
 *  - a set of severity filter buttons
 *  - a bar chart where bar widths are normalised to the maximum mention count
 *  - issue cards showing details and quotes
 *  - a table view of the underlying data
 *
 * Selecting a severity filter shows only issues from that tier. Clicking the
 * selected filter again resets the filter. This component is self‑contained
 * and does not rely on any build step thanks to the UMD React bundle.
 */
function Dashboard() {
  const [filter, setFilter] = React.useState(null);

  // Determine the maximum number of mentions to normalise bar widths
  const maxMentions = React.useMemo(() => {
    return ISSUES.reduce((max, item) => Math.max(max, item.mentions), 0);
  }, []);

  // Filtered issues based on the selected severity
  const filteredIssues = React.useMemo(() => {
    if (!filter) return ISSUES;
    return ISSUES.filter(item => item.sev === filter);
  }, [filter]);

  // Helper for toggling severity filter
  const toggleFilter = (sev) => {
    setFilter(prev => (prev === sev ? null : sev));
  };

  // Map severity codes to human readable names for filter buttons
  const sevNames = {
    'sev-1': 'Sev‑1',
    'sev-2': 'Sev‑2',
    'sev-3': 'Sev‑3',
    'sev-4': 'Sev‑4'
  };

  return React.createElement('div', null,
    // Hero section
    React.createElement('div', { className: 'hero' },
      React.createElement('h1', null, 'Rewards App — Issues & User Dissatisfaction'),
      React.createElement('p', null, 'Weighted by impact on checkout and prevalence in reviews'),
      React.createElement('p', null, 'Total reviews analysed: 600+'),
      React.createElement('p', null, [
        'Most mentioned issue: ',
        React.createElement('strong', { key: 'most' }, 'Auth friction & failures')
      ]),
      React.createElement('p', null, [
        'Top critical blocker: ',
        React.createElement('strong', { key: 'top' }, 'App unavailable / crashes')
      ])
    ),
    // Filter buttons
    React.createElement('div', { className: 'filter-bar' },
      Object.keys(sevNames).map((sev) =>
        React.createElement('button', {
          key: sev,
          className: 'filter-btn' + (filter === sev ? ' active' : ''),
          style: { borderColor: `var(--${sev})` },
          onClick: () => toggleFilter(sev)
        }, sevNames[sev])
      )
    ),
    // Bar chart
    React.createElement('div', { className: 'bar-section' },
      React.createElement('h2', null, 'Mentions by issue'),
      filteredIssues.map(item =>
        React.createElement('div', { className: 'bar', key: item.id },
          React.createElement('span', { className: 'label' }, item.title),
          React.createElement('div', { className: 'meter' },
            React.createElement('div', {
              className: 'fill',
              style: {
                backgroundColor: `var(--${item.sev})`,
                width: `${Math.round((item.mentions / maxMentions) * 100)}%`
              }
            })
          )
        )
      )
    ),
    // Issue cards
    React.createElement('div', { className: 'card-list' },
      filteredIssues.map(item =>
        React.createElement('div', {
          className: 'card',
          key: item.id,
          style: { borderTop: `5px solid var(--${item.sev})` }
        },
          React.createElement('h3', null, item.title),
          React.createElement('p', null, React.createElement('strong', null, 'Severity:'), ' ', item.severityLabel),
          React.createElement('p', null, React.createElement('strong', null, 'Mentions:'), ' ', item.mentions, ' (', item.prevalence, ')'),
          React.createElement('p', { className: 'small' }, '“' + item.quote + '”')
        )
      )
    ),
    // Data table
    React.createElement('table', null,
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, 'Issue'),
          React.createElement('th', null, 'Severity'),
          React.createElement('th', null, 'Mentions'),
          React.createElement('th', null, 'Prevalence')
        )
      ),
      React.createElement('tbody', null,
        filteredIssues.map(item =>
          React.createElement('tr', { key: item.id },
            React.createElement('td', null, item.title),
            React.createElement('td', null, sevNames[item.sev]),
            React.createElement('td', null, item.mentions),
            React.createElement('td', null, item.prevalence)
          )
        )
      )
    ),
    // Footer
    React.createElement('div', { className: 'footer' },
      '© 2025 Analysis based on public app reviews. Feel free to customise the colours and text via CSS variables and the script configuration.'
    )
  );
}

// Mount the dashboard into the root element
if (typeof ReactDOM !== 'undefined') {
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Dashboard));
}