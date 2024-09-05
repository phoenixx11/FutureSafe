
export interface TimeCapsule {
    data: string; 
    unlockDate: Date;
    authorizedUsers: string[]; 
    paymentRequired: boolean;  //  false for now
    holographicMessage?: string;
    memoryEnhancements?: string;
    visualTheme?: string;
  }
  