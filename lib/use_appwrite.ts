// use_appwrite.ts
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// Fungsi useAppwrite yang generik, bisa digunakan untuk tipe data apa saja.
function useAppwrite<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null); // Data dengan tipe generik T
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response); // Mengatur data dengan tipe T
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
}

export default useAppwrite;
