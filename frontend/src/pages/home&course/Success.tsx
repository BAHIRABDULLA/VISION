// const sessionId = searchParams.get('session_id');
// const response = await fetch(`/api/stripe/session/${sessionId}`);



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';


const Success = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5)
  useEffect(() => {
    if (count <= 0) {
      navigate("/dashboard/billing");
      return;
    }

    const timer = setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (

    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader
          avatar={<CheckCircle className="text-green-500" size={32} />}
          title={<Typography variant="h5">Payment Successful</Typography>}
          className="text-center"
        />
        <CardContent>
          <div className="text-center">
            <Typography variant="body1" className="mb-4">
              Thank you for your purchase!
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-6">
              This page will be closed in {count} seconds.
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;