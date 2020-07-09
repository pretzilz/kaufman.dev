
//an iam user configured with only read access to s3. so, go nuts.
var creds = new AWS.Credentials('AKIAZTNDODFUX6BB2AM7', '6TZst1adsqVMCFGJzCCcKbVSdw3NvdMLWQvpcacC');


const client = new AWS.S3({
    region: 'us-east-2',
    credentials: creds
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

client.selectObjectContent(params, (err, data) => {
    if (err) {
		console.log(err)
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