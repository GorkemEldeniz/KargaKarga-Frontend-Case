export type LoginResponseType =
	| {
			status: true;
			data: {
				id: number;
				fullName: string;
				email: string;
				token: string;
			};
	  }
	| {
			status: false;
			errors: {
				email?: string[];
				password?: string[];
			};
	  }
	| {
			status: false;
			messsage: string[];
	  };
