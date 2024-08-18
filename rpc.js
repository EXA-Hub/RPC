console.log(
  `
\x1b[31m   ┓┏┓┏┳┓┏┓┓┏\x1b[0m
\x1b[32m   ┗┗┻┛┗┗┣┛┛┗    Discord: @ZAMPX\x1b[0m
\x1b[34m         ┛\x1b[0m
\x1b[36m   https://github.com/EXA-Hub\x1b[0m
`
);

async function getChannel(channelHandle) {
  const ytch = require("yt-channel-info");
  const response = await ytch.getChannelVideos({
    channelId: channelHandle,
    channelIdType: 3,
  });
  return response.items[0];
}

(async () => {
  const RPC = require("discord-rpc");
  const prompts = require("prompts");

  const clientId = "734860656469213246"; // Your Discord application client ID

  RPC.register(clientId);
  const rpc = new RPC.Client({ transport: "ipc" });

  const activities = [
    {
      name: "Testing APIs in Postman with VS Code icon",
      value: {
        details: "Testing APIs 🛠️",
        state: "Postman 🚀",
        largeImageKey: "postman-icon",
        largeImageText: "Postman",
        smallImageKey: "vscode",
        smallImageText: "VS Code",
        buttons: [{ label: "View GitHub", url: "https://github.com/EXA-Hub" }],
        instance: true,
        startTimestamp: Date.now(),
      },
    },
    {
      name: "Editing a video in Adobe Premiere Pro with YouTube logo",
      value: {
        details: "Editing a video 🔥",
        state: "Adobe Premiere Pro ✨",
        largeImageKey: "premiere",
        largeImageText: "Adobe Premiere Pro",
        smallImageKey: "youtube",
        smallImageText: "EXA-4-EVER",
        buttons: [
          { label: "View YouTube", url: "https://youtube.com/exa4ever" },
        ],
        instance: false,
        startTimestamp: Date.now(),
      },
    },
    {
      name: "Invite people to watch Your YouTube channel",
      value: null, // Placeholder for user input
    },
  ];

  function setActivity(activity) {
    rpc.setActivity(activity);
    console.log(activity);
  }

  rpc.on("ready", async () => {
    console.log("RPC connected");

    try {
      const response = await prompts({
        type: "select",
        name: "activity",
        message: "Select activity:",
        choices: activities.map((act, index) => ({
          title: act.name,
          value: index,
        })),
      });

      console.log("Selected activity:", activities[response.activity].name);

      if (response.activity === 2) {
        // If the third activity (YouTube invite) is selected
        const channelInput = await prompts({
          type: "text",
          name: "channelHandle",
          message: "Enter the YouTube channel handle:",
        });

        if (channelInput.channelHandle) {
          const data = await getChannel(channelInput.channelHandle);
          const inviteActivity = {
            details: data.title,
            state: data.viewCountText + " - " + data.publishedText + " 🔥",
            largeImageKey: "exa4ever",
            largeImageText: data.author + " ✨",
            smallImageKey: "youtube",
            smallImageText: data.author,
            buttons: [
              {
                label: "View Channel",
                url: "https://www.youtube.com/@" + data.authorId,
              },
              {
                label: "Watch " + data.durationText + " ⌚",
                url: "https://www.youtube.com/watch?v=" + data.videoId,
              },
            ],
            instance: false,
            endTimestamp: Date.now() + data.lengthSeconds * 1000,
            startTimestamp: Date.now(),
          };
          setActivity(inviteActivity);
        } else {
          console.log("No channel handle provided");
        }
      } else if (response.activity !== undefined) {
        setActivity(activities[response.activity].value);
      } else {
        console.log("No activity selected");
      }
    } catch (error) {
      console.error("Error during prompt:", error);
    }
  });

  rpc.on("disconnected", () => {
    console.log("RPC disconnected");
  });

  rpc.on("error", (error) => {
    console.error("RPC error:", error);
  });

  rpc.login({ clientId }).catch(console.error);
})();
