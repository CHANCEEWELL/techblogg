$(document).ready(function () {

    // DOM Variables
    const addPost = $('#button');
    const homepageDivEl = $('#homepage');
    const newpostsDivEl = $('#newDiv');
    const newPost = `<form class="mx-auto col-md-6 mt-5"><div class="mb-3"><label for="newTitle" class="form-label">Title</label><input type="text" class="form-control" id="newTitle"></div><div class="mb-3"><label for="newContent" class="form-label">Content</label><textarea type="text" class="form-control" id="newContent" rows="4"></textarea></div><button id="beHeard" type="submit" class="btn btn-dark">Be Heard!</button></form>`;
    
  
    // functions
    async function submitPost(post) {
      try {
        const result = await $.ajax({
          url: '/api/post',
          data: post,
          method: 'POST',
        });
  
        console.log(result);
        const addedPost = `<div class="card mx-auto col-md-6 mt-5 bg-dark">
        <div class="card-body">
            <div class="row card-title mb-3">
                <h5 class="text-light float-left">${result.title}</h5>
                <p class="text-light float-right">${result.date}</p>
            </div>
            <p class="mb-3 card-text text-white">${result.content}</p>
        </div>
      </div>`
      newpostsDivEl.append(addedPost);
        
  
      } catch (err) {
        console.log(err);
      }
    };
  
    // click events
    addPost.on('click', (e) => {
      e.preventDefault();
      addPost.addClass('disabled');
      newpostsDivEl.append(newPost);
    });
  
    homepageDivEl.on('click', '.add-comment', (e) => {
      e.preventDefault();
      const id = $(e.currentTarget).attr('id');
      console.log(id);
    });

    newpostsDivEl.on('click', '#beHeard', (e) => {
        addPost.removeClass('disabled');
        const newTitleEl = $('#newTitle');
        const newContentEl = $('#newContent');
        const post = {
          title: newTitleEl.val(),
          content: newContentEl.val(),
        };
        if (post.title == null || post.content == null) {
          alert('please enter a post before clicking this button')
        } else {
          submitPost(post);
        }
      });
  
  });