import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    if (!username) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/github/${username}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch. Start backend with `cd backend && npm start`.');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      padding: '2rem 1rem', 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#0f172a'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Search */}
        <form onSubmit={handleSearch} style={{ 
          maxWidth: '600px', 
          margin: '0 auto 4rem', 
          padding: '3rem', 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)', 
          border: '1px solid #e2e8f0'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            color: '#1e293b', 
            marginBottom: '2rem', 
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif"
          }}>
            GitHub Analyzer
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <input
              name="username"
              placeholder="Enter GitHub username e.g. octocat"
              style={{ 
                flex: 1, 
                padding: '1.25rem 1.5rem', 
                border: '2px solid #e2e8f0', 
                borderRadius: '16px', 
                fontSize: '1.25rem', 
                fontWeight: 500,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '1.25rem 2.5rem', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '1.125rem', 
                borderRadius: '16px', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
            >
              {loading ? 'Analyzing...' : 'Analyze Profile'}
            </button>
          </div>
        </form>

        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '8rem 2rem', 
            fontSize: '1.5rem', 
            fontWeight: 600,
            color: '#475569'
          }}>
            <div style={{ 
              width: '5rem', 
              height: '5rem', 
              border: '4px solid #e2e8f0', 
              borderTop: '4px solid #3b82f6', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite', 
              margin: '0 auto 2rem' 
            }} />
            Fetching GitHub data...
          </div>
        )}

        {error && (
          <div style={{ 
            maxWidth: '700px', 
            margin: '0 auto 4rem', 
            padding: '3rem', 
            backgroundColor: '#fef2f2', 
            border: '2px solid #fecaca', 
            borderRadius: '20px', 
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>⚠️</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#dc2626', marginBottom: '1rem' }}>Oops!</h3>
            <p style={{ fontSize: '1.25rem', color: '#b91c1c', lineHeight: 1.6 }}>{error}</p>
          </div>
        )}

        {data && (
          <div>
            {/* Profile Card */}
            <div style={{ 
              maxWidth: '450px', 
              margin: '0 auto 4rem', 
              padding: '3rem', 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              boxShadow: '0 25px 60px rgba(0,0,0,0.08)', 
              border: '1px solid #f1f5f9',
              textAlign: 'center'
            }}>
              <img 
                src={data.profile.avatar_url} 
                alt={data.profile.login} 
                style={{ 
                  width: '10rem', 
                  height: '10rem', 
                  borderRadius: '50%', 
                  margin: '0 auto 2rem', 
                  border: '6px solid white',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                }} 
              />
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 800, 
                color: '#0f172a', 
                marginBottom: '0.75rem' 
              }}>
                {data.profile.name || data.profile.login}
              </h2>
              <p style={{ 
                fontSize: '1.75rem', 
                color: '#64748b', 
                marginBottom: '3rem', 
                fontWeight: 500
              }}>
                @{data.profile.login}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div>
                  <p style={{ fontSize: '3rem', fontWeight: 800, color: '#059669' }}>{data.profile.public_repos}</p>
                  <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.125rem' }}>Repos</p>
                </div>
                <div>
                  <p style={{ fontSize: '3rem', fontWeight: 800, color: '#3b82f6' }}>{data.profile.followers}</p>
                  <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.125rem' }}>Followers</p>
                </div>
                <div>
                  <p style={{ fontSize: '3rem', fontWeight: 800, color: '#7c3aed' }}>{data.profile.following}</p>
                  <p style={{ color: '#64748b', fontWeight: 600, fontSize: '1.125rem' }}>Following</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr)', 
              gap: '2rem', 
              marginBottom: '4rem', 
              maxWidth: '1200px', 
              margin: '0 auto 4rem'
            }}>
              <div style={{ 
                padding: '3rem', 
                backgroundColor: 'white', 
                borderRadius: '24px', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.08)', 
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '4rem', 
                  fontWeight: 800, 
                  color: '#d97706', 
                  marginBottom: '1rem' 
                }}>
                  ⭐ {data.stats.totalStars.toLocaleString()}
                </p>
                <p style={{ 
                  fontSize: '1.5rem', 
                  color: '#64748b', 
                  fontWeight: 600 
                }}>Total Stars</p>
              </div>
              <div style={{ 
                padding: '3rem', 
                backgroundColor: 'white', 
                borderRadius: '24px', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.08)', 
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: '4rem', 
                  fontWeight: 800, 
                  color: '#4f46e5', 
                  marginBottom: '1rem' 
                }}>
                  {data.stats.totalRepos.toLocaleString()}
                </p>
                <p style={{ 
                  fontSize: '1.5rem', 
                  color: '#64748b', 
                  fontWeight: 600 
                }}>Repositories</p>
              </div>
            </div>

            {/* Languages */}
            {data.stats.languages && data.stats.languages.length > 0 && (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '3rem', 
                borderRadius: '24px', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.08)', 
                border: '1px solid #f1f5f9',
                maxWidth: '900px', 
                margin: '0 auto 4rem' 
              }}>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  marginBottom: '2.5rem', 
                  textAlign: 'center',
                  color: '#0f172a'
                }}>Top Languages</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr)', gap: '1.5rem' }}>
                  {data.stats.languages.slice(0, 8).map(([lang, count], idx) => (
                    <div key={idx} style={{ 
                      padding: '1.5rem 2rem', 
                      backgroundColor: '#f8fafc', 
                      borderRadius: '16px', 
                      borderLeft: '5px solid #3b82f6',
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    >
                      <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a' }}>{lang}</span>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Repos Table */}
            {data.topRepos && data.topRepos.length > 0 && (
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '24px', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.08)', 
                border: '1px solid #f1f5f9',
                maxWidth: '1400px', 
                margin: '0 auto',
                overflow: 'hidden'
              }}>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  padding: '3rem 3rem 2rem', 
                  backgroundColor: '#f8fafc', 
                  borderBottom: '1px solid #e2e8f0'
                }}>Top 5 Repositories</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '2rem 3rem', textAlign: 'left', fontWeight: 700, color: '#374151', fontSize: '1.125rem', letterSpacing: '0.05em' }}>Repository</th>
                        <th style={{ padding: '2rem 3rem', textAlign: 'left', fontWeight: 700, color: '#374151', fontSize: '1.125rem', letterSpacing: '0.05em' }}>Stars</th>
                        <th style={{ padding: '2rem 3rem', textAlign: 'left', fontWeight: 700, color: '#374151', fontSize: '1.125rem', letterSpacing: '0.05em' }}>Language</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topRepos.map((repo, idx) => (
                        <tr key={idx} style={{ borderTop: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '2rem 3rem', fontWeight: 600, fontSize: '1.25rem', color: '#0f172a' }}>{repo.name}</td>
                          <td style={{ padding: '2rem 3rem' }}>
                            <span style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              padding: '0.75rem 1.5rem', 
                              backgroundColor: '#f59e0b', 
                              color: 'white', 
                              fontWeight: 700, 
                              borderRadius: '9999px', 
                              fontSize: '1.25rem' 
                            }}>
                              ⭐ {repo.stars.toLocaleString()}
                            </span>
                          </td>
                          <td style={{ padding: '2rem 3rem' }}>
                            {repo.language ? (
                              <span style={{ 
                                padding: '0.75rem 1.5rem', 
                                fontSize: '1.125rem', 
                                fontWeight: 600, 
                                borderRadius: '9999px', 
                                backgroundColor: '#3b82f6', 
                                color: 'white' 
                              }}>
                                {repo.language}
                              </span>
                            ) : (
                              <span style={{ 
                                padding: '0.75rem 1.5rem', 
                                fontSize: '1.125rem', 
                                fontWeight: 600, 
                                borderRadius: '9999px', 
                                backgroundColor: '#e2e8f0', 
                                color: '#64748b' 
                              }}>
                                N/A
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;

