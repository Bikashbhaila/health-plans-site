import type {HealthPlan} from "../util/types.ts";
import {COMPARE_KEY} from "../util/constants.ts";

export function saveCompare(plans: HealthPlan[]) {
    sessionStorage.setItem(COMPARE_KEY, JSON.stringify(plans));
}

export function loadCompare(): HealthPlan[] {
    try {
        const raw = sessionStorage.getItem(COMPARE_KEY);
        return raw ? (JSON.parse(raw) as HealthPlan[]) : [];
    } catch {
        return [];
    }
}
