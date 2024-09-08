export const validateData = async (shapeRdfData, rdfData, setValidationReport, setIsLoading) => {
    setIsLoading(true);
    const maxRetries = 5;
    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shapes_data: shapeRdfData,
                    data: rdfData
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setValidationReport(result.stdout);
                success = true;
            } else {
                throw new Error('Backend not ready yet');
            }
        } catch (error) {
            console.error(error);
            attempts++;
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
        }
    }
    setIsLoading(false);
    if (!success) {
        console.error('Failed to connect to backend after multiple attempts');
    }
};