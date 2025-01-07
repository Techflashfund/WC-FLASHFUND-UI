


export const verifyBusinessAccount = async (username) => {
  
  const businessDetails = useBusinessStore.getState().businessDetails;


  
  try {
    const response = await fetch('/api/business-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        ...businessDetails, 
      }),
    });
    
    if (!response.ok) {
      throw new Error('Verification failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to verify business account');
  }
};