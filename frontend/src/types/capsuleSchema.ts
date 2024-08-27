
export interface TimeCapsule {
    data: string; 
    unlockDate: Date;
    authorizedUsers: string[]; 
    paymentRequired: false;  //  false for now
    holographicMessage?: string;
    memoryEnhancements?: string;
    visualTheme?: string;
  }
  