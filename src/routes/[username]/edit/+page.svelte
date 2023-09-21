<script lang="ts">
  import { page } from "$app/stores";
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, userData, user } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { writable } from "svelte/store";

  const icons = [
    "Twitter",
    "YouTube",
    "TikTok",
    "LinkedIn",
    "GitHub",
    "Custom",
  ];

  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  };

  const formData = writable(formDefaults);

  let showForm = false;

  $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
  $: formIsValid = urlIsValid && titleIsValid;

  async function addLink(e: SubmitEvent) {
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({
        ...$formData,
        id: Date.now().toString(),
      }),
    });

    formData.set({
      icon: "",
      title: "",
      url: "",
    });

    showForm = false;
  }

  function sortList(e: CustomEvent) {
    const newList = e.detail;
    const userRef = doc(db, "users", $user!.uid);
    setDoc(userRef, { links: newList }, { merge: true });
  }

  async function deleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      links: arrayRemove(item),
    });
  }

  function cancelLink() {
    formData.set(formDefaults);
    cancelLink;
    showForm = false;
  }
  cancelLink;
</script>

<main class="max-w-xl mx-auto">
  {#if $userData?.username == $page.params.username}
    <div class="w-full">
      <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">
        Edit your Profile
      </h1>

      <SortableList
        list={$userData?.links ?? []}
        on:sort={sortList}
        let:item
        let:index
      >
        <div class="group relative">
          <UserLink {...item} />
          <button
            on:click={() => deleteLink(item)}
            class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
            >Delete</button
          >
        </div>
      </SortableList>
    </div>

    <div class="w-72 p-2">
      {#if showForm}
        <form
          on:submit|preventDefault={addLink}
          class="bg-base-200 p-4 max-w-sm mx-auto rounded-xl"
        >
          <select
            name="icon"
            class="select select-sm mb-2"
            bind:value={$formData.icon}
          >
            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input
            name="title"
            type="text"
            placeholder="Title"
            class="input input-sm mb-2"
            bind:value={$formData.title}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
          />

          <div class="flex justify-between mt-6">
            <button
              disabled={!formIsValid}
              type="submit"
              class="btn btn-success block">Add Link</button
            >
            <button type="button" class="btn btn-xs my-4" on:click={cancelLink}
              >Cancel</button
            >
          </div>
        </form>
      {:else}
        <button
          on:click={() => (showForm = true)}
          class="btn btn-outline btn-info block mx-auto my-4"
        >
          Add a Link
        </button>
      {/if}
    </div>
  {/if}
</main>
