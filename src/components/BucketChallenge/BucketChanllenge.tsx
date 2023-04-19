import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { solveWaterBucket } from "./solveWaterBucket";

let enableButton = false;

const BucketChallenge = () => {
  const [bucketA, setbucketA] = useState({ capacity: 10, amount: 0 });
  const [bucketB, setbucketB] = useState({ capacity: 1, amount: 0 });
  const [target, setTarget] = useState(2);
  const [solution, setSolution] = useState<string[]>([]);
  const [steps, setSteps] = useState<{ bucketA: number; bucketB: number }[]>(
    []
  );

  const handlebucketACapacityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setbucketA({ capacity: parseInt(event.target.value), amount: 0 });
    setSolution([]);
    setSteps([]);
  };

  const handlebucketBCapacityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setbucketB({ capacity: parseInt(event.target.value), amount: 0 });
    setSolution([]);
    setSteps([]);
  };

  const handleTargetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(parseInt(event.target.value));
    setSolution([]);
    setSteps([]);
  };

  const hanldeSolve = () => {
    if ((bucketA.capacity || bucketB.capacity || target) < 0) {
      return;
    }
    const result = solveWaterBucket(bucketA.capacity, bucketB.capacity, target);
    if (result) {
      const { solution, steps } = result;
      setSolution(solution);
      setSteps(steps);
    } else {
      setSolution(["No solution"]);
      setSteps([]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "2rem", mb: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Water bucket puzzle
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.5rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          id="bucketA"
          label="Bucket A capacity"
          type="number"
          value={bucketA.capacity}
          onChange={handlebucketACapacityChange}
          variant="outlined"
          required
        />
        <TextField
          id="bucketB"
          label="Bucket B capacity"
          type="number"
          value={bucketB.capacity}
          onChange={handlebucketBCapacityChange}
          variant="outlined"
          required
        />
        <TextField
          id="target"
          label="Target amount"
          type="number"
          value={target}
          onChange={handleTargetChange}
          variant="outlined"
          required
        />
        {bucketA.capacity > 0 && bucketB.capacity > 0 && target > 0 ? (
          <Button variant="contained" onClick={hanldeSolve}>
            Solve
          </Button>
        ) : (
          <Button variant="contained" onClick={hanldeSolve} disabled>
            Solve
          </Button>
        )}
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.5rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5">Solution:</Typography>
        {solution.map((step, i) => (
          <Typography key={i} variant="body1">
            {step}
          </Typography>
        ))}
        {steps.length > 0 && (
          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h5">Steps:</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bucket A</TableCell>
                  <TableCell>Bucket B</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {steps.map(({ bucketA, bucketB }, i) => (
                  <TableRow key={i}>
                    <TableCell>{bucketA}</TableCell>
                    <TableCell>{bucketB}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BucketChallenge;
