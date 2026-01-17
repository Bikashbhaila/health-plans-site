import type { HealthPlan } from "../util/types.ts";

export async function fetchHealthPlans(): Promise<HealthPlan[]> {
    const url = `${import.meta.env.BASE_URL}health-plans.json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to load health plans...")
    }

    return response.json();
}
