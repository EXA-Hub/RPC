const RPC = require('discord-rpc');
const prompts = require('prompts'); // Correctly import prompts

const clientId = '734860656469213246'; // Your Discord application client ID

RPC.register(clientId);

const rpc = new RPC.Client({ transport: 'ipc' });

const activities = [
    {
        name: 'Testing APIs in Postman with VS Code icon',
        value: {
            details: 'Testing APIs 🛠️',
            state: 'Postman 🚀',
            largeImageKey: 'postman-icon',
            largeImageText: 'Postman',
            smallImageKey: 'vscode',
            smallImageText: 'VS Code',
            buttons: [
                { label: 'View GitHub', url: 'https://github.com/EXA-Hub' }
            ],
            instance: false,
        }
    },
    {
        name: 'Editing a video in Adobe Premiere Pro with YouTube logo',
        value: {
            details: 'Editing a video 🔥',
            state: 'Adobe Premiere Pro ✨',
            largeImageKey: 'premiere',
            largeImageText: 'Adobe Premiere Pro',
            smallImageKey: 'youtube',
            smallImageText: 'EXA-4-EVER',
            buttons: [
                { label: 'View YouTube', url: 'https://youtube.com/exa4ever' }
            ],
            instance: false,
        }
    }
];

function setActivity(activity) {
    rpc.setActivity(activity);
    console.log(`Status set to ${activity.details} in ${activity.state}`);
}

rpc.on('ready', async () => {
    console.log('RPC connected');

    try {
        const response = await prompts({
            type: 'select',
            name: 'activity',
            message: 'Select activity:',
            choices: activities.map(act => ({ title: act.name, value: act.value }))
        });

        console.log('Selected activity:', response.activity); // Debug output

        if (response.activity) {
            setActivity(response.activity);
        } else {
            console.log('No activity selected');
        }
    } catch (error) {
        console.error('Error during prompt:', error);
    }
});

rpc.on('disconnected', () => {
    console.log('RPC disconnected');
});

rpc.on('error', (error) => {
    console.error('RPC error:', error);
});

rpc.login({ clientId }).catch(console.error);
