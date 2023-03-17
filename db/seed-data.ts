interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: lorem imp",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "en progreso: lorem imp2",
      status: "in-progress",
      createdAt: Date.now() - 1000,
    },
    {
      description: "Terminada: lorem imp3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
