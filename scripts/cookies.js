const S3 = require('aws-sdk/clients/s3');
const client = new S3({
	region: 'us-east-2'
});

const params = {
	Bucket: 'kaufman.dev',
	Key: 'cookies.csv',
	ExpressionType: 'SQL',
	Expression: 'SELECT Brand,Location,Type,Price,Quantity,Score,Comment FROM S3Object',
	InputSerialization: {
		CSV: {
			FileHeaderInfo: 'USE',
			RecordDelimiter: '\n',
			FieldDelimiter: ','
		}
	},
	OutputSerialization: {
		CSV: {}
	}
};

s3.selectObjectContent(params, (err, data) => {
	if (err) {
		switch (err.name) {
			// Check against specific error codes that need custom handling
		}
		return;
	}

	// data.Payload is a Readable Stream
	const events = data.Payload;
	
	for (const event of events) {
		if (event.Records) {
			// event.Records.Payload is a buffer containing
			// a single record, partial records, or multiple records
			console.log(event.Records.Payload.toString());
		} else if (event.Stats) {
			console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
		} else if (event.End) {
			console.log('SelectObjectContent completed');
		}
	}
});