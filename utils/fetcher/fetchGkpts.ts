export const fetchGkpts = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/gkpt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch gkpts:", error);
    return { error: "Failed to fetch data" };
  }
};

export const fetchGkpt = async (gkpt_id: string) => {
  try {
    const res = await fetch(`${process.env.URL}/api/gkpt/detail/${gkpt_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch gkpt:", error);
    return { error: "Failed to fetch data" };
  }
};

export const fetchIndividualGkpts = async (uuid: string) => {
  try {
    const res = await fetch(`${process.env.URL}/api/gkpt/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch individual gkpts:", error);
    return { error: "Failed to fetch data" };
  }
};
