function sendRequest() {

  // Category
  let category = "Any";
  if (document.querySelector('input[name="catMode"]:checked').value === "Custom") {
    const selected = [...document.querySelectorAll('.cat:checked')]
      .map(c => c.value);
    if (selected.length) category = selected.join(",");
  }

  // Language
  const lang = document.getElementById("language").value;

  // Flags
  const flags = [...document.querySelectorAll('.flag:checked')]
    .map(f => f.value).join(",");

  // Format
  const format = document.querySelector('input[name="format"]:checked').value;

  // Types
  const types = [...document.querySelectorAll('.type:checked')]
    .map(t => t.value).join(",");

  // Search
  const contains = document.getElementById("contains").value;


  // Amount
  const amount = document.getElementById("amount").value;

  // Build URL
  let url = `https://v2.jokeapi.dev/joke/${category}?lang=${lang}&amount=${amount}`;

  if (flags) url += `&blacklistFlags=${flags}`;
  if (format === "txt") url += `&format=txt`;
  if (types) url += `&type=${types}`;
  if (contains) url += `&contains=${encodeURIComponent(contains)}`;

  document.getElementById("url").innerText = url;

  // Fetch
  fetch(url)
    .then(res => format === "txt" ? res.text() : res.json())
    .then(data => {
      document.getElementById("result").innerText =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
    });
}


function resetForm() {

  // Reset category
  document.querySelector('input[name="catMode"][value="Any"]').checked = true;
  document.querySelectorAll('.cat').forEach(c => c.checked = false);

  // Reset language
  document.getElementById("language").value = "en";

  // Reset flags
  document.querySelectorAll('.flag').forEach(f => f.checked = false);

  // Reset format
  document.querySelector('input[name="format"][value="json"]').checked = true;

  // Reset joke types
  document.querySelectorAll('.type').forEach(t => t.checked = true);

  // Reset search
  document.getElementById("contains").value = "";

  // Reset amount
  document.getElementById("amount").value = 1;

  // Clear URL & result
  document.getElementById("url").innerText = "";
  document.getElementById("result").innerText = "Result will appear here...";
}